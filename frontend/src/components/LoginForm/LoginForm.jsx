import { useRef } from "react";
import BasicButton from "../BasicButton/BasicButton";
import FormInput from "../FormInput/FormInput";
import CryptoJS from "crypto-js";
import "./LoginForm.scss";

const LoginForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitLogin = async (e) => {
    e.preventDefault();

    const encryptedPassword = CryptoJS.AES.encrypt(passwordRef.current.value, process.env.REACT_APP_ENCRYPTION_SECRET).toString();

    const payload = {
      email: emailRef.current.value,
      password: encryptedPassword,
    };

    console.log("Payload sent to login user", payload);

    try {
      fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((data) => data.json())
        .then((res) => {
          console.log("Login Response", res);
          props.setLoginToken(res.data.token);
          props.setUserData(res.data.user);
        });
    } catch (error) {
      console.log("Login Error", error);
      throw new Error(error);
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
