import "./SelectedArtistSpotlight.scss";

const SelectedArtistSpotlight = ({ artistData, setPlayTrack }) => {
  return (
    <div className="selectedArtistSpotlight">
      <div className="selectedArtistSpotlight__image">
        <img src={artistData.images[0].url} alt={artistData.name} />
      </div>
      <div className="selectedArtistSpotlight__name">{artistData.name}</div>
    </div>
  );
};

export default SelectedArtistSpotlight;
