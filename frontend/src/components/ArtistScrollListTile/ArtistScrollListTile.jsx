import "./ArtistScrollListTile.scss";

const ArtistScrollListTile = ({ artistData }) => {
  return (
    <div className="artistScrollListTile">
      <div className="artistScrollListTile__image">
        <img src={artistData.image} alt={artistData.name} />
      </div>
    </div>
  );
};

export default ArtistScrollListTile;
