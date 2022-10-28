import { useState } from "react";
import ScrollableSongListItem from "../ScrollableSongListIem/ScrollableSongListIem";
import "./ScrollableSongList.scss";

const ScrollableSongList = ({ songs, songSpotlight, setSongSpotlight }) => {
  const listItems = [];

  for (let curSong of songs) {
    listItems.push(
      <ScrollableSongListItem
        key={curSong.id}
        song={curSong}
        songSpotlight={songSpotlight}
        setSongSpotlight={setSongSpotlight}
      />
    );
  }

  return <ul className="scrollableSongList">{listItems}</ul>;
};

export default ScrollableSongList;
