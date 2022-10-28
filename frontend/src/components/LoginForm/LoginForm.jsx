import { useRef } from "react";
import BasicButton from "../BasicButton/BasicButton";
import FormInput from "../FormInput/FormInput";
import "./LoginForm.scss";

const LoginForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      .then(data => data.json())
      .then((res) => {
        console.log("Received Login Token", res.token)
        props.setUserData(res.user)
      })
    } catch (error) {
      console.log("Login Error", error)
      throw new Error(error)
    }
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
