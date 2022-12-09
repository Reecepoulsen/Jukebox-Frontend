import { useState } from "react";
import { RiDiscLine } from "react-icons/ri";
import BasicButton from "../BasicButton/BasicButton";
import GenModal from "../GenModal/GenModal";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import "./GreetingScreen.scss";

const GreetingScreen = (props) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  localStorage.clear();

  return (
    <div className="greetingScreen">
      <div className="greetingScreen__header">
        <h1 className="greetingScreen__header__title">Jukebox</h1>
        <RiDiscLine className="icon" size={60} />
      </div>
      <div className="greetingScreen__buttons">
        <BasicButton
          type="button"
          text="Signup"
          OnClickFunc={() => setOpenSignupModal(true)}
        />
        <BasicButton
          type="button"
          text="Login"
          OnClickFunc={() => setOpenLoginModal(true)}
        />
      </div>
      <GenModal
        modalIsOpen={openLoginModal}
        setModalIsOpen={setOpenLoginModal}
        top={"40%"}
        body={
          <LoginForm
            setOpenLoginModal={setOpenLoginModal}
            setLoginToken={props.setLoginToken}
          />
        }
      />
      <GenModal
        modalIsOpen={openSignupModal}
        setModalIsOpen={setOpenSignupModal}
        top={"40%"}
        body={
          <SignupForm
            setOpenSignupModal={setOpenSignupModal}
            setLoginToken={props.setLoginToken}
          />
        }
      />
      <div className="arch"></div>
      <div className="shapes"></div>
    </div>
  );
};

export default GreetingScreen;
