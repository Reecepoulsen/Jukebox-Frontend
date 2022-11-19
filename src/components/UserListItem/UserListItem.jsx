import FollowerCount from "../FollowerCount/FollowerCount";
import { RiUserAddLine, RiUserFill } from "react-icons/ri";
import "./UserListItem.scss";
import { useState } from "react";

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
    <li className="userListItem">
      <div className="profilePicture">
        <img
          src={
            props.profileImage === "None"
              ? "https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/Profile_avatar_placeholder_large.png?alt=media&token=602d1c6b-004c-4e8b-85a1-0d6d5fcddb7b"
              : props.profileImage
          }
          alt=""
          className="profilePicture__img"
        />
      </div>
      <h2 className="username">{props.username}</h2>
      <FollowerCount count={props.followerCount} />
      <RiUserAddLine
        className="icon"
        size={iconSize}
        onClick={() => setUserFollowed(!userFollowed)}
      />
    </li>
  );

  const listItemFollowed = (
    <li className="userListItem">
      <div className="profilePicture">
        <img
          src={
            props.profileImage === "None"
              ? "https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/Profile_avatar_placeholder_large.png?alt=media&token=602d1c6b-004c-4e8b-85a1-0d6d5fcddb7b"
              : props.profileImage
          }
          alt=""
          className="profilePicture__img"
        />
      </div>
      <h2 className="username">{props.username}</h2>
      <FollowerCount count={props.followerCount} />
      <RiUserFill
        className="icon"
        size={iconSize}
        onClick={() => setUserFollowed(!userFollowed)}
      />
    </li>
  );

  if (userFollowed) {
    return listItemFollowed;
  } else {
    return listItemNotFollowed;
  }
}
