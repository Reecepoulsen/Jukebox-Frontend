import PlaylistTile from '../PlaylistTile/PlaylistTile';
import './SidescrollList.scss';

const SidescrollList = ({listData}) => {
  const listItems = [];

  listData.map((i) => listItems.push(<li><PlaylistTile playListData={i}/></li>))

  return (
    <ul className="sideScrollList">{listItems}</ul>
  )
}

export default SidescrollList;