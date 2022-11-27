import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import "./Player.scss";

export default function Player({ trackUri }) {
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [containerBg, setContainerBg] = useState("rgba(18, 18, 18, .9)");
  const [playerScale, setPlayerScale] = useState(1);
  const [iconRotation, setIconRotation] = useState("90");

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
          console.log("Response for get users spotify token", response);
          setSpotifyToken(response.data);
        });
    }
  }, [spotifyToken]);

  if (!spotifyToken || !trackUri) {
    return null;
  } else {
    return (
      <div
        className="player__container"
        style={{
          background: `${containerBg}`,
        }}
      >
        <div
          className="player"
          style={{
            transform: `scale(${playerScale})`,
          }}
        >
          <SpotifyPlayer
            token={spotifyToken}
            uris={trackUri ? [trackUri] : []}
            name="Jukebox"
            styles={{
              sliderColor: "#02CBE5",
              sliderHandleColor: "#FFFEFE",
              bgColor: "Transparent",
              trackNameColor: "#FFFEFE",
              trackArtistColor: "#FFFEFE",
              color: "#02CBE5",
              sliderHandleColor: "Transparent",
              sliderTrackColor: "#242424",
              height: 50,
            }}
          />
        </div>
        <div
          className="collapseBtn"
          style={{
            transform: `rotate(${iconRotation}deg)`,
          }}
          onClick={() => {
            setIconRotation(iconRotation === "90" ? "-90" : "90");
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
