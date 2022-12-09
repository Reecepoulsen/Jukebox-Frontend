import { useState, useEffect } from "react";
import { RiDiscLine, RiDiscFill } from "react-icons/ri";
import { MdOutlineExplicit } from "react-icons/md";
import { Timeout } from "../../helpers/abortController";
import "./ScrollableSongListItem.scss";

const addSong = async (song) => {
  const payload = {
    trackUris: [song.uri],
    song: song,
  };
  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/playlist/addSong`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: Timeout(15).signal,
    }
  ).then((response) => response.json());
  console.log("Result of add song", result);
};

const removeSong = async (song) => {
  const payload = {
    trackUris: [song.uri],
    song: song,
  };
  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/playlist/removeSong`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        "Content-Type": "application/json",
      },
      signal: Timeout(15).signal,
      body: JSON.stringify(payload),
    }
  ).then((response) => response.json());
  console.log("Result of remove song", result);
};

const ScrollableSongListItem = ({
  song,
  uriList,
  index,
  songSpotlight,
  setSongSpotlight,
  size = "24",
  charLimit = 11,
  inJukeboxPlaylist = false,
  setPlayerList,
  setPlayerTrackIndex,
  playerTrackIndex,
}) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  const [savedSong, setSavedSong] = useState(inJukeboxPlaylist);
  if (song.track?.name) {
    song = song.track;
  }

  let discIcon = null;
  if (savedSong) {
    discIcon = (
      <RiDiscFill
        className="scrollableSongListItem-Icon"
        size={size}
        onClick={() => {
          removeSong(song).catch((err) => setError(err));
          setSavedSong(false);
        }}
      />
    );
  } else {
    discIcon = (
      <RiDiscLine
        className="scrollableSongListItem-Icon"
        size={size}
        onClick={() => {
          addSong(song).catch((err) => setError(err));
          setSavedSong(true);
        }}
      />
    );
  }

  return (
    <li
      className={`scrollableSongListItem ${
        songSpotlight.id === song.id ? "activeSong" : ""
      }`}
    >
      {song.explicit && (
        <div className="explicitTag">
          <MdOutlineExplicit size={20} />
        </div>
      )}
      <span
        className="scrollableSongListItem-Title"
        onClick={() => {
          setSongSpotlight(song);
          setPlayerTrackIndex(index);
          setPlayerList(uriList);
        }}
      >
        {song.name.length > charLimit
          ? song.name.substring(0, charLimit) + "..."
          : song.name}
      </span>
      {discIcon}
    </li>
  );
};

export default ScrollableSongListItem;
