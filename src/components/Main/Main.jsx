import "./Main.scss";
import Profile from "../Profile/Profile";
import MobileNav from "../MobileNav/MobileNav";
import Connect from "../Connect/Connect";
import { useState } from "react";

export default function Main(props) {
  const profileView = (
    <Profile
      loginToken={props.loginToken}
      setLoginToken={props.setLoginToken}
      setConnectedSpotify={props.setConnectedSpotify}
    />
  );

  const connectView = <Connect />;

  const [currentView, setCurrentView] = useState(profileView);
  return (
    <div className="main">
      {currentView}
      <MobileNav
        profileView={profileView}
        connectView={connectView}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}
