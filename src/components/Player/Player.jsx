import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { Timeout } from "../../helpers/abortController";
import "./Player.scss";

const getSpotifyToken = async () => {
  const token = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/token/spotify`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
      signal: Timeout(15).signal,
    }
  )
    .then((result) => result.json())
    .then((response) => {
      return response.data;
    });
  return token;
};

export default function Player({
  playerList,
  setPlayerTrackIndex,
  playerTrackIndex,
}) {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  const [spotifyToken, setSpotifyToken] = useState(null);
  const [containerBg, setContainerBg] = useState("rgba(18, 18, 18, .9)");
  const [playerScale, setPlayerScale] = useState(1);
  const [iconRotation, setIconRotation] = useState("90");
  const [pointerEvents, setPointerEvents] = useState("auto");

  useEffect(() => {
    if (!spotifyToken) {
      getSpotifyToken()
        .then((response) => {
          setSpotifyToken(response);
        })
        .catch((err) => setError(err));
    }
  }, [spotifyToken]);

  if (!spotifyToken || !playerList) {
    return null;
  } else {
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
          <SpotifyPlayer
            token={spotifyToken}
            uris={
              playerList.length > 750 ? playerList.slice(0, 750) : playerList
            }
            offset={playerTrackIndex}
            name="Jukebox"
            persistDeviceSelection="false"
            initialVolume={50}
            styles={{
              sliderColor: "var(--app-highlightColor)",
              sliderHandleColor: "#FFFEFE",
              bgColor: "Transparent",
              trackNameColor: "#FFFEFE",
              trackArtistColor: "#FFFEFE",
              color: "var(--app-highlightColor)",
              sliderTrackColor: "#242424",
              height: 50,
            }}
            callback={(playerState) => {
              if (playerState.isPlaying) {
                getSpotifyToken()
                  .then((token) => {
                    setSpotifyToken(token);
                  })
                  .catch((err) => setError(err));
              }
            }}
          />
        </div>
        <div
          className="collapseBtn"
          style={{
            transform: `rotate(${iconRotation}deg)`,
            pointerEvents: "auto",
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
