import SidescrollList from '../SidescrollList/SidescrollList';
import './WidgetPlaylistList.scss'

const WidgetPlaylistList = (props) => {
  return (
    <div className="widgetPlaylistList">
      <SidescrollList listData={props.playlists} setPlayTrack={props.setPlayTrack}/>
    </div>
  )
}

export default WidgetPlaylistList;