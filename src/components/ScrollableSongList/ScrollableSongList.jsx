import { useState } from "react";
import { useEffect } from "react";
import { getUsersJukeboxPlaylist } from "../../helpers/getUsersJukeboxPlaylist";
import Loading from "../Loading/Loading";
import ScrollableSongListItem from "../ScrollableSongListIem/ScrollableSongListIem";
import "./ScrollableSongList.scss";

const ScrollableSongList = ({
  songs,
  songSpotlight,
  setSongSpotlight,
  setPlayerList,
  setPlayerTrackIndex,
  playerTrackIndex,
}) => {
  const [jukeboxPlaylist, setJukeboxPlaylist] = useState(null);

  useEffect(() => {
    if (jukeboxPlaylist === null) {
      getUsersJukeboxPlaylist().then((jukeboxPlaylist) => {
        setJukeboxPlaylist(jukeboxPlaylist);
      });
    }
  }, []);
  let listItems = [];

  if (jukeboxPlaylist) {
    let uriList = [];
    songs.forEach((song) => {
      if (song.track?.name) {
        uriList.push(song.track.uri);
      } else {
        uriList.push(song.uri);
      }
    });

    let counter = 0;
    songs.forEach((song) => {
      listItems.push(
        <ScrollableSongListItem
          key={counter}
          song={song}
          uriList={uriList}
          index={counter}
          songSpotlight={songSpotlight}
          setSongSpotlight={setSongSpotlight}
          inJukeboxPlaylist={jukeboxPlaylist.hasOwnProperty(song.id)}
          setPlayerList={setPlayerList}
          setPlayerTrackIndex={setPlayerTrackIndex}
          playerTrackIndex={playerTrackIndex}
        />
      );
      counter++;
    });
  } else {
    listItems = <Loading />;
  }

  return <ul className="scrollableSongList">{listItems}</ul>;
};

export default ScrollableSongList;
