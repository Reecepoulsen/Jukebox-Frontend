import "./ArtistScrollListTile.scss";

const ArtistScrollListTile = ({ artistData }) => {
  return (
    <div className="artistScrollListTile">
      <div className="artistScrollListTile__image">
        <img src={artistData.images[0].url} alt={artistData.name} />
      </div>
    </div>
  );
};

export default ArtistScrollListTile;
