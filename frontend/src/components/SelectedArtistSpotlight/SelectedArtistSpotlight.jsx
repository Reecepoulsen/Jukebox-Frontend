import "./SelectedArtistSpotlight.scss";

const SelectedArtistSpotlight = ({ artistData }) => {
  return (
    <div className="selectedArtistSpotlight">
      <div className="selectedArtistSpotlight__image">
        <img src={artistData.image} alt={artistData.name} />
      </div>
      <div className="selectedArtistSpotlight__name">{artistData.name}</div>
    </div>
  );
};

export default SelectedArtistSpotlight;
