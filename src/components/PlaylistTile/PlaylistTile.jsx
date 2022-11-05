import "./PlaylistTile.scss";

const PlaylistTile = ({ playListData }) => {
  return (
    <div className="tile">
      <div className="tile__image">
        <img
          src={playListData.images.length > 0 ? playListData.images[0].url : ""}
          alt={`${playListData.name}'s cover art`}
        />
      </div>
      <div className="tile__title">
        {playListData.name.length > 12
          ? playListData.name.substring(0, 12) + "..."
          : playListData.name}
      </div>
    </div>
  );
};

export default PlaylistTile;
