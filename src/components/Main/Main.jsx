import "./Main.scss";
import Profile from "../Profile/Profile";
import MobileNav from "../MobileNav/MobileNav";
import Connect from "../Connect/Connect";
import { useState } from "react";
import Player from "../Player/Player";
import { useEffect } from "react";

export default function Main(props) {
  const [playerList, setPlayerList] = useState(null);
  const [playerTrackIndex, setPlayerTrackIndex] = useState(0);

  const profileView = (
    <Profile
      loginToken={props.loginToken}
      setLoginToken={props.setLoginToken}
      setConnectedSpotify={props.setConnectedSpotify}
      setPlayerList={setPlayerList}
      setPlayerTrackIndex={setPlayerTrackIndex}
      playerTrackIndex={playerTrackIndex}
    />
  );

  const connectView = (
    <Connect
      setPlayerList={setPlayerList}
      setPlayerTrackIndex={setPlayerTrackIndex}
    />
  );

  const [currentView, setCurrentView] = useState(profileView);
  return (
    <div className="main">
      {currentView}
      <Player
        playerList={playerList}
        setPlayerTrackIndex={setPlayerTrackIndex}
        playerTrackIndex={playerTrackIndex}
      />
      <MobileNav
        profileView={profileView}
        connectView={connectView}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}
