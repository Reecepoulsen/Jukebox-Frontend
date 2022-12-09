import { useRef, useState, useEffect } from "react";
import BasicButton from "../BasicButton/BasicButton";
import FormInput from "../FormInput/FormInput";
import CryptoJS from "crypto-js";
import { Timeout } from "../../helpers/abortController";
import "./SignupForm.scss";

const SignupForm = (props) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitSignup = async (e) => {
    localStorage.clear();
    props.setOpenSignupModal(false);
    e.preventDefault();

    const encryptedPassword = CryptoJS.AES.encrypt(
      passwordRef.current.value,
      process.env.REACT_APP_ENCRYPTION_SECRET
    ).toString();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: encryptedPassword,
    };

    console.log("Payload sent when creating new user", payload);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      signal: Timeout(15).signal,
      body: JSON.stringify(payload),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.statusCode === 401) {
          alert("A user with that email already exists");
        } else {
          props.setLoginToken(res.data.token);
        }
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="signupForm">
      <h2>Create Account</h2>
      <form onSubmit={submitSignup}>
        <FormInput
          inputId="signupName"
          type="text"
          helpText="Name"
          isRequired={true}
          refer={nameRef}
        />
        <FormInput
          inputId="signupEmail"
          type="email"
          helpText="Email"
          isRequired={true}
          refer={emailRef}
        />
        <FormInput
          inputId="signupPassword"
          type="password"
          helpText="Password"
          isRequired={true}
          refer={passwordRef}
        />
        <BasicButton type="submit" text="Signup" OnClickFunc={() => {}} />
      </form>
    </div>
  );
};

export default SignupForm;
