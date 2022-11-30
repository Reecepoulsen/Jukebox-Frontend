import { useState } from "react";
import ArtistScrollList from "../ArtistScrollList/ArtistScrollList";
import SelectedArtistSpotlight from "../SelectedArtistSpotlight/SelectedArtistSpotlight";
import "./WidgetArtistSpotlight.scss";

const WidgetArtistSpotlight = ({
  artistList,
  setPlayerList,
  setPlayerTrackIndex,
  playerTrackIndex,
}) => {
  const [spotlightArtist, setSpotlightArtist] = useState(artistList[0]);

  return (
    <div className="widgetArtistSpotlight">
      <SelectedArtistSpotlight
        artistData={spotlightArtist}
        setPlayerList={setPlayerList}
        setPlayerTrackIndex={setPlayerTrackIndex}
        playerTrackIndex={playerTrackIndex}
      />
      <ArtistScrollList
        artistList={artistList}
        setSpotlightArtist={setSpotlightArtist}
      />
    </div>
  );
};

export default WidgetArtistSpotlight;
