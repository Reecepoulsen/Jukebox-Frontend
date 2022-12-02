import './ArtistModal.scss'
import React from 'react'
import ScrollableSongList from '../ScrollableSongList/ScrollableSongList'
import { useState } from 'react';
import Loading from '../Loading/Loading';
import { useEffect } from 'react';
import { getUsersJukeboxPlaylist } from '../../helpers/getUsersJukeboxPlaylist';
import ScrollableSongListItem from '../ScrollableSongListIem/ScrollableSongListIem';
import { RiDiscLine } from 'react-icons/ri';

const loadSongs = async (artistData) => {
  console.log("Loading songs for", artistData.name);
  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/artist/${artistData.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        "Content-type": "application/json",
      },
    }
  ).then((res) => res.json());
  return result.data;
};

export default function ArtistModal(props) {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState(false);
  const [focusedSong, setFocusedSong] = useState(0);
  const [jukeboxPlaylist, setJukeboxPlaylist] = useState(null);

  useEffect(() => {
    if (!songs) {
      loadSongs(props.artistData).then(songs => {
        setSongs(songs);
        setLoading(false);
        if (!jukeboxPlaylist) {
          getUsersJukeboxPlaylist().then((jboxPlaylist) => {
            setJukeboxPlaylist(jboxPlaylist);
          })
        }
      })
    }
  }, [])

  if (loading || !jukeboxPlaylist) {
    return <Loading />
  } else {
    console.log("Songs is", songs)
    let uriList = [];
    songs.forEach((song) => {
      uriList.push(song.uri);
    })

    const songList = [];
    let counter = 0;

    songs.forEach(song => {
      songList.push(
        <ScrollableSongListItem 
          key={counter}
          song={song}
          uriList={uriList}
          index={counter}
          songSpotlight={focusedSong}
          setSongSpotlight={setFocusedSong}
          size="30"
          charLimit="24"
          inJukeboxPlaylist={jukeboxPlaylist.hasOwnProperty(song.id)}
          setPlayerList={props.setPlayerList}
          setPlayerTrackIndex={props.setPlayerTrackIndex}
          playerTrackIndex={props.playerTrackIndex}
        />
      );
      counter ++;
    });

    let artistImg = null;
    if (props.artistData.images[0]) {
      artistImg = <img src={props.artistData.images[0].url} alt="" />;
    } else {
      artistImg = (
        <div className="artistPlaceholder">
          <RiDiscLine size="50" />
        </div>
      );
    }

    return (
      <div className='artistModal'>
        <div className="header">
          <h2 className="header__title">Top Songs: {props.artistData.name}</h2>
          <p className="header__songCount">Songs: {songList.length}</p>
          <div className="header__image">{artistImg}</div>
        </div>
        <ul className="songList">{songList}</ul>
      </div>
    )
  }
}
