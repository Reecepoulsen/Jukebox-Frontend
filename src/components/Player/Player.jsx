import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import "./Player.scss";

export default function Player({
  playerList,
  setPlayerTrackIndex,
  playerTrackIndex,
}) {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [containerBg, setContainerBg] = useState("rgba(18, 18, 18, .9)");
  const [playerScale, setPlayerScale] = useState(1);
  const [iconRotation, setIconRotation] = useState("90");
  const [pointerEvents, setPointerEvents] = useState("auto");

  // const controls = document.getElementsByClassName("_ControlsRSWP")
  // if (controls?.length > 0) {
  //   controls.children[0].addEventListener("click", () => {
  //     console.log("subtract 1")
  //     setPlayerTrackIndex(playerTrackIndex -= 1);
  //   })
  //   controls.children[1].addEventListener("click", () => {
  //     setPlayerTrackIndex(playerTrackIndex += 1);
  //   })
  //   console.log("Hello")
  // }
  // console.log("controls", controls);

  useEffect(() => {
    if (!spotifyToken) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/token/spotify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
      })
        .then((result) => result.json())
        .then((response) => {
          setSpotifyToken(response.data);
        });
    }
  }, [spotifyToken]);

  if (!spotifyToken || !playerList) {
    return null;
  } else {
    let songRange = [];
    if (playerList.length > 700) {
      let min = 0;
      let max = playerList.length - 1;
      let boundCount = 350;
      let newSongIndex = playerTrackIndex;

      if (playerTrackIndex - boundCount > 0) {
        min = playerTrackIndex - boundCount;
        newSongIndex = 350;
      }

      if (playerTrackIndex + boundCount > playerList.length - 1) {
        max = playerTrackIndex + boundCount;
      }

      playerTrackIndex = newSongIndex;
      playerList = playerList.slice(min, max);
    }
    return (
      <div
        className="player__container"
        style={{
          background: `${containerBg}`,
          pointerEvents: `${pointerEvents}`,
        }}
      >
        <div
          className="player"
          style={{
            transform: `scale(${playerScale})`,
          }}
        >
          {/* Implement a range where the selected index is the middle of the 750 songs */}
          <SpotifyPlayer
            token={spotifyToken}
            uris={
              playerList.length > 750 ? playerList.slice(0, 750) : playerList
            }
            offset={playerTrackIndex}
            name="Jukebox"
            persistDeviceSelection="false"
            styles={{
              sliderColor: "#02CBE5",
              sliderHandleColor: "#FFFEFE",
              bgColor: "Transparent",
              trackNameColor: "#FFFEFE",
              trackArtistColor: "#FFFEFE",
              color: "#02CBE5",
              // sliderHandleColor: "Transparent",
              sliderTrackColor: "#242424",
              height: 50,
            }}
          />
        </div>
        <div
          className="collapseBtn"
          style={{
            transform: `rotate(${iconRotation}deg)`,
            pointerEvents: "auto"
          }}
          onClick={() => {
            setIconRotation(iconRotation === "90" ? "-90" : "90");
            setPointerEvents(pointerEvents === "none" ? "auto" : "none");
            setContainerBg(
              containerBg === "Transparent"
                ? "rgba(18, 18, 18, .9)"
                : "Transparent"
            );
            setPlayerScale(playerScale === 1 ? 0 : 1);
          }}
        >
          <TbLayoutSidebarRightCollapse size="30" />
        </div>
      </div>
    );
  }
}
