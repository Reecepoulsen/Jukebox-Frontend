import { useState } from "react";
import ScrollableSongList from "../ScrollableSongList/ScrollableSongList";
import SongSpotlight from "../SongSpotlight/SongSpotlight";
import './WidgetFavSongs.scss';


const WidgetFavSongs = ({songs}) => {
  const [songSpotlight, setSongSpotlight] = useState(songs[0]);
  return (
    <div className="favSongsBody">
      <ScrollableSongList songs={songs} songSpotlight={songSpotlight} setSongSpotlight={setSongSpotlight}/>
      <SongSpotlight songData={songSpotlight} />
    </div>
  )
};

export default WidgetFavSongs;