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

  return (
    <div className="greetingScreen">
      <div className="greetingScreen__header">
        <h1 className="greetingScreen__header__title">Jukebox</h1>
        <RiDiscLine size={50} />
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
        body={
          <LoginForm
            setOpenLoginModal={setOpenLoginModal}
            setUserData={props.setUserData}
          />
        }
      />
      <GenModal
        modalIsOpen={openSignupModal}
        setModalIsOpen={setOpenSignupModal}
        body={
          <SignupForm
            setOpenSignupModal={setOpenSignupModal}
            setUserData={props.setUserData}
          />
        }
      />
    </div>
  );
};

export default GreetingScreen;
