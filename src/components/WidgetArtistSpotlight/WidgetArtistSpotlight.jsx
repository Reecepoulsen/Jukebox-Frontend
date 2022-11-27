import { useState } from "react";
import ArtistScrollList from "../ArtistScrollList/ArtistScrollList";
import SelectedArtistSpotlight from "../SelectedArtistSpotlight/SelectedArtistSpotlight";
import "./WidgetArtistSpotlight.scss";

const WidgetArtistSpotlight = ({ artistList, setPlayTrack }) => {
  const [spotlightArtist, setSpotlightArtist] = useState(artistList[0]);

  return (
    <div className="widgetArtistSpotlight">
      <SelectedArtistSpotlight
        artistData={spotlightArtist}
        setPlayTrack={setPlayTrack}
      />
      <ArtistScrollList
        artistList={artistList}
        setSpotlightArtist={setSpotlightArtist}
      />
    </div>
  );
};

export default WidgetArtistSpotlight;
