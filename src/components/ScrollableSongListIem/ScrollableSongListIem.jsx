import { RiDiscLine, RiDiscFill } from "react-icons/ri";
import "./ScrollableSongListItem.scss";

const ScrollableSongListItem = ({ song, songSpotlight ,setSongSpotlight }) => {

  return (
    <li
      className={`scrollableSongListItem ${songSpotlight.id === song.id ? "activeSong" : ""}`}
      onClick={() => {
        setSongSpotlight(song);
      }}
    >
      <span className="scrollableSongListItem-Title">
        {song.name.length > 14
          ? song.name.substring(0, 14) + "..."
          : song.name}
      </span>
      <RiDiscLine className="scrollableSongListItem-Icon" size="24" />
    </li>
  );
};

export default ScrollableSongListItem;
