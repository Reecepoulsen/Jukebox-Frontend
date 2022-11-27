import "./Main.scss";
import Profile from "../Profile/Profile";
import MobileNav from "../MobileNav/MobileNav";
import Connect from "../Connect/Connect";
import { useState } from "react";
import Player from "../Player/Player";
import { useEffect } from "react";

export default function Main(props) {
  const [playTrack, setPlayTrack] = useState(null);

  const profileView = (
    <Profile
      loginToken={props.loginToken}
      setLoginToken={props.setLoginToken}
      setConnectedSpotify={props.setConnectedSpotify}
      setPlayTrack={setPlayTrack}
    />
  );

  const connectView = <Connect setPlayTrack={setPlayTrack}/>;

  const [currentView, setCurrentView] = useState(profileView);
  return (
    <div className="main">
      {currentView}
      <Player trackUri={playTrack} />
      <MobileNav
        profileView={profileView}
        connectView={connectView}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}
