import { useState } from "react";
import { useEffect } from "react";
import { getUsersJukeboxPlaylist } from "../../helpers/getUsersJukeboxPlaylist";
import Loading from "../Loading/Loading";
import ScrollableSongListItem from "../ScrollableSongListIem/ScrollableSongListIem";
import "./ScrollableSongList.scss";

const ScrollableSongList = ({ songs, songSpotlight, setSongSpotlight }) => {
  const [jukeboxPlaylist, setJukeboxPlaylist] = useState(null);
  useEffect(() => {
    if (jukeboxPlaylist === null) {
      getUsersJukeboxPlaylist().then(jukeboxPlaylist => {
        setJukeboxPlaylist(jukeboxPlaylist);
      })
    }
  }, [])

  let listItems = [];
  let counter = 0;

  if (jukeboxPlaylist !== null) {
    songs.map(song => {
      listItems.push(
        <ScrollableSongListItem
          key={counter}
          song={song}
          songSpotlight={songSpotlight}
          setSongSpotlight={setSongSpotlight}
          inJukeboxPlaylist={jukeboxPlaylist.hasOwnProperty(song.id)}
        />
      );
      counter++;
    })
  } else {
    listItems = <Loading />
  }

  return <ul className="scrollableSongList">{listItems}</ul>;
};

export default ScrollableSongList;
