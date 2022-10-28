import { useRef } from "react";
import BasicButton from "../BasicButton/BasicButton";
import FormInput from "../FormInput/FormInput";
import "./SignupForm.scss";

const SignupForm = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitSignup = async (e) => {
    props.setOpenSignupModal(false);
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((data) => data.json())
        .then((res) => {
          console.log("Signup response", res);
          props.setLoginToken(res.data.token);
          props.setUserData(res.data.user);
        });
    } catch (error) {
      console.log("Login Error", error);
      throw new Error(error);
    }
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
