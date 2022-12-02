import React, { useEffect } from "react";
import { useState } from "react";
import { RiDiscLine } from "react-icons/ri";
import { getUsersJukeboxPlaylist } from "../../helpers/getUsersJukeboxPlaylist";
import Loading from "../Loading/Loading";
import ScrollableSongListItem from "../ScrollableSongListIem/ScrollableSongListIem";
import "./PlaylistModal.scss";

const loadSongs = async (playlistData) => {
  console.log("Loading songs for this playlist", playlistData.name);
  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/songs/${playlistData.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        "Content-type": "application/json",
      },
    }
  ).then((res) => res.json());
  console.log("Result of loading songs", result);
  return result;
};

export default function PlaylistModal({
  playlistData,
  setPlayerList,
  setPlayerTrackIndex,
  playerTrackIndex
}) {
  const [tracks, setTracks] = useState(null);
  const [focusedSong, setFocusedSong] = useState(0);
  const [jukeboxPlaylist, setJukeboxPlaylist] = useState(null);

  useEffect(() => {
    // console.log("Tracks before", tracks);
    loadSongs(playlistData).then((res) => setTracks(res.data.flat()));
    // console.log("Tracks after", tracks);
    if (jukeboxPlaylist === null) {
      getUsersJukeboxPlaylist().then((jukeboxPlaylist) => {
        setJukeboxPlaylist(jukeboxPlaylist);
      });
    }
  }, []);

  if (playlistData === null || tracks === null || jukeboxPlaylist === null) {
    // console.log("tracks is null");
    return <Loading />;
  } else {

    let uriList = [];
    tracks.forEach((song) => {
      if (song.track?.name) {
        if (!song.track.is_local){
          uriList.push(song.track.uri);
        }
      } else {
        if (!song.is_local) {
          uriList.push(song.uri);
        }
      }
    })

    const songList = [];
    let counter = 0;

    tracks.map((song) => {
      if (!song.is_local) {
        songList.push(
          <ScrollableSongListItem
            key={counter}
            song={song.track}
            uriList={uriList}
            index={counter}
            songSpotlight={focusedSong}
            setSongSpotlight={setFocusedSong}
            size="30"
            charLimit="24"
            inJukeboxPlaylist={jukeboxPlaylist.hasOwnProperty(song.track.id)}
            setPlayerList={setPlayerList}
            setPlayerTrackIndex={setPlayerTrackIndex}
            playerTrackIndex={playerTrackIndex}
          />
        );
        counter++;
      }
    });

    let playlistImg = null;
    if (playlistData.images[0]) {
      playlistImg = <img src={playlistData.images[0].url} alt="" />;
    } else {
      playlistImg = (
        <div className="playlistPlaceholder">
          <RiDiscLine size="50" />
        </div>
      );
    }

    return (
      <div className="playlistModal">
        <div className="header">
          <h2 className="header__title">{playlistData.name}</h2>
          <p className="header__songCount">Songs: {songList.length}</p>
          <div className="header__image">{playlistImg}</div>
        </div>
        <ul className="songList">{songList}</ul>
      </div>
    );
  }
}
