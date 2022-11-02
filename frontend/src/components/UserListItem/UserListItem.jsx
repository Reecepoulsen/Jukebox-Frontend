import FollowerCount from '../FollowerCount/FollowerCount'
import {RiUserAddLine, RiUserFill} from 'react-icons/ri'
import './UserListItem.scss'
import { useState } from 'react'

// Info that this component needs:
// - Is this user being followed by the current user? -> tells which icon to show
// - Username
// - FollowerCount
// - Image source
// - Profile Id attached to list item to open on click
export default function UserListItem(props) {
  const iconSize = 28;
  const [userFollowed, setUserFollowed] = useState(props.isFollowed);
  
  const listItemNotFollowed = (
    <li className='userListItem'>
      <div className="profilePicture">
        <img src={props.profileImage} alt="" className="profilePicture__img" />
      </div>
      <h2 className="username">{props.username}</h2>
      <FollowerCount count={props.followerCount}/>
      <RiUserAddLine className="icon" size={iconSize} onClick={() => setUserFollowed(!userFollowed)}/>
    </li>
  )

  const listItemFollowed = (
    <li className='userListItem'>
      <div className="profilePicture">
        <img src={props.profileImage} alt="" className="profilePicture__img" />
      </div>
      <h2 className="username">{props.username}</h2>
      <FollowerCount count={props.followerCount}/>
      <RiUserFill className="icon" size={iconSize} onClick={() => setUserFollowed(!userFollowed)}/>
    </li>
  )

  if (userFollowed) {
    return listItemFollowed;
  } else {
    return listItemNotFollowed;
  }
}
