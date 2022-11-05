import PlaylistTile from '../PlaylistTile/PlaylistTile';
import './SidescrollList.scss';

const SidescrollList = ({listData}) => {
  const listItems = [];

  listData.map((playlist) => {
    if (playlist.owner.display_name === "Spotify") return
    listItems.push(<li><PlaylistTile playListData={playlist}/></li>)
  })

  return (
    <ul className="sideScrollList">{listItems}</ul>
  )
}

export default SidescrollList;