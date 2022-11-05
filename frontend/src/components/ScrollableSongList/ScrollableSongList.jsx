import { useState } from "react";
import ScrollableSongListItem from "../ScrollableSongListIem/ScrollableSongListIem";
import "./ScrollableSongList.scss";

const ScrollableSongList = ({ songs, songSpotlight, setSongSpotlight }) => {
  const listItems = [];
  let counter = 0;

  songs.map(song => {
    listItems.push(
      <ScrollableSongListItem
        key={counter}
        song={song}
        songSpotlight={songSpotlight}
        setSongSpotlight={setSongSpotlight}
      />
    );
    counter++;
  })

  return <ul className="scrollableSongList">{listItems}</ul>;
};

export default ScrollableSongList;
