import { useState } from "react";
import { RiDiscLine, RiDiscFill } from "react-icons/ri";
import "./ScrollableSongListItem.scss";

const ScrollableSongListItem = ({ song, songSpotlight, setSongSpotlight }) => {
  const [savedSong, setSavedSong] = useState(false);

  let discIcon = null;
  if (savedSong) {
    discIcon = <RiDiscFill className="scrollableSongListItem-Icon" size="24" onClick={() => {
      console.log("Remove Song")
      setSavedSong(false);
    }} />
  } else {
    discIcon = <RiDiscLine className="scrollableSongListItem-Icon" size="24" onClick={() => {
      console.log("Add Song")
      setSavedSong(true);
    }}/>
  }

  return (
    <li
      className={`scrollableSongListItem ${
        songSpotlight.id === song.id ? "activeSong" : ""
      }`}
    >
      <span
        className="scrollableSongListItem-Title"
        onClick={() => {
          setSongSpotlight(song);
        }}
      >
        {song.name.length > 14 ? song.name.substring(0, 14) + "..." : song.name}
      </span>
      {discIcon}
    </li>
  );
};

export default ScrollableSongListItem;
