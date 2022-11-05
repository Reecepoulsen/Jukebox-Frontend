import SidescrollList from '../SidescrollList/SidescrollList';
import './WidgetPlaylistList.scss'

const WidgetPlaylistList = (props) => {
  return (
    <div className="widgetPlaylistList">
      <SidescrollList listData={props.playlists} />
    </div>
  )
}

export default WidgetPlaylistList;