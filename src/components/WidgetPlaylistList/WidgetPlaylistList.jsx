import SidescrollList from "../SidescrollList/SidescrollList";
import "./WidgetPlaylistList.scss";

const WidgetPlaylistList = (props) => {
  return (
    <div className="widgetPlaylistList">
      <SidescrollList
        listData={props.playlists}
        setPlayerList={props.setPlayerList}
        setPlayerTrackIndex={props.setPlayerTrackIndex}
        playerTrackIndex={props.playerTrackIndex}
      />
    </div>
  );
};

export default WidgetPlaylistList;
