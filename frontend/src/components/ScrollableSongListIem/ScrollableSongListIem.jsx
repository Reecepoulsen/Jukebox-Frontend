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
        {song.title.length > 14
          ? song.title.substring(0, 14) + "..."
          : song.title}
      </span>
      <RiDiscLine className="scrollableSongListItem-Icon" size="24" />
    </li>
  );
};

export default ScrollableSongListItem;
