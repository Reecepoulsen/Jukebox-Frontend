import React, { useEffect } from "react";
import { useState } from "react";
import { RiDiscLine } from "react-icons/ri";
import Loading from "../Loading/Loading";
import "./PlaylistModal.scss";

const loadSongs = async (playlistData) => {
  console.log("Loading songs for this playlist", playlistData.name);
  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/songs/${playlistData.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
        "Content-type": "application/json",
      },
    }
  ).then(res => res.json());
  console.log("Result of loading songs", result);
  return result;
};

export default function PlaylistModal({ playlistData }) {
  console.log("Playlistdata on playlist modal", playlistData)
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    console.log("Tracks before", tracks);
    loadSongs(playlistData).then(res => setTracks(res.data.flat()));
    console.log("Tracks after", tracks);
  }, []);

  if (playlistData === null || tracks === null) {
    console.log("tracks is null")
    return <Loading />;
  } else {
    console.log("Tracks is", tracks);
    const songList = [];
    let counter = 0;
  
    tracks.map((song) => {
      songList.push(
        <li className="song" key={counter}>
          <span className="song__title">
            {song.track.name.length > 24
              ? song.track.name.substring(0, 24) + "..."
              : song.track.name}
          </span>
          <RiDiscLine className="song__icon" size="24" />
        </li>
      );
      counter++;
    });
  
    return (
      <div className="playlistModal">
        <div className="header">
          <h2 className="header__title">{playlistData.name}</h2>
          <p className="header__songCount">Songs: {playlistData.tracks.total}</p>
          <div className="header__image">
            <img
              src={playlistData.images[0] ? playlistData.images[0].url : ""}
              alt=""
            />
          </div>
        </div>
        <ul className="songList">{songList}</ul>
      </div>
    );
  }
}
