import PlaylistTile from "../PlaylistTile/PlaylistTile";
import "./SidescrollList.scss";

const SidescrollList = ({
  listData,
  setPlayerList,
  setPlayerTrackIndex,
  playerTrackIndex,
}) => {
  const listItems = [];
  let counter = 0;

  listData.map((playlist) => {
    if (playlist.owner?.display_name === "Spotify") return;
    listItems.push(
      <li key={counter}>
        <PlaylistTile
          playlistData={playlist}
          setPlayerList={setPlayerList}
          setPlayerTrackIndex={setPlayerTrackIndex}
          playerTrackIndex={playerTrackIndex}
        />
      </li>
    );
    counter++;
  });

  return <ul className="sideScrollList">{listItems}</ul>;
};

export default SidescrollList;
