import { useState } from "react";
import AnimatedTileList from "../AnimatedTileList/AnimatedTileList";
import GenModal from "../GenModal/GenModal";
import {RiDiscLine} from 'react-icons/ri';
import "./ProfileBanner.scss";

const ProfileBanner = ({ profileData }) => {
  let songs = profileData.widgetList[0].data;

  let imgList = [];
  songs.forEach(song => {
    imgList.push(song.album.images[0].url);
  });

  return (
    <div className="profileBanner">
      <AnimatedTileList imgList={imgList}/>
      <RiDiscLine className="discIcon" size={120}/>
    </div>
  );
};

export default ProfileBanner;
