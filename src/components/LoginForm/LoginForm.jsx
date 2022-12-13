import { useRef } from "react";
import BasicButton from "../BasicButton/BasicButton";
import FormInput from "../FormInput/FormInput";
import CryptoJS from "crypto-js";
import { Timeout } from "../../helpers/abortController";
import "./LoginForm.scss";
import { useState } from "react";
import { useEffect } from "react";

const LoginForm = (props) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);
  
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitLogin = async (e) => {
    localStorage.clear();
    e.preventDefault();

    const encryptedPassword = CryptoJS.AES.encrypt(
      passwordRef.current.value,
      process.env.REACT_APP_ENCRYPTION_SECRET
    ).toString();

    const payload = {
      email: emailRef.current.value,
      password: encryptedPassword,
    };

    console.log("Payload sent to login user", payload);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      signal: Timeout(45).signal,
      body: JSON.stringify(payload),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.statusCode === 401) {
          alert("Invalid Login");
        } else {
          props.setLoginToken(res.data.token);
        }
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="loginForm">
      <h2>Jukebox Login</h2>
      <form onSubmit={submitLogin}>
        <FormInput
          inputId="loginEmail"
          type="email"
          helpText="Email"
          isRequired={true}
          refer={emailRef}
        />
        <FormInput
          inputId="loginPassword"
          type="password"
          helpText="Password"
          isRequired={true}
          refer={passwordRef}
        />
        <BasicButton type="submit" text="Login" OnClickFunc={() => {}} />
      </form>
    </div>
  );
};

export default LoginForm;
