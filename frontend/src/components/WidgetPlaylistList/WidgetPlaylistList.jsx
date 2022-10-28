import SidescrollList from '../SidescrollList/SidescrollList';
import './WidgetPlaylistList.scss'

const WidgetPlaylistList = (props) => {
  return (
    <div className="widgetPlaylistList">
      <SidescrollList listData={props.profileData.playlists} />
    </div>
  )
}

export default WidgetPlaylistList;