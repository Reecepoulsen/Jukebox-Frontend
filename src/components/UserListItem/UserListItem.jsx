import FollowerCount from "../FollowerCount/FollowerCount";
import { RiUserAddLine, RiUserFill } from "react-icons/ri";
import "./UserListItem.scss";
import { useState } from "react";
import ProfilePicPlaceholder from "../ProfilePicPlaceholder/ProfilePicPlaceholder";

const modifyFollowerStatus = async (operation, userId, userliteId) => {
  const payload = {
    operation: operation,
    followerUserId: userId,
    followerUserliteId: userliteId
  }

  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/followers/modify`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("loginToken")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(res => res.json())

  console.log("Result of modifyFollowerStatus", response);
}

export default function UserListItem(props) {
  const iconSize = 28;
  const [userFollowed, setUserFollowed] = useState(props.isFollowed);

  let profilePicture = null;
  if (props.userlite.profileImg === "None") {
    profilePicture = <ProfilePicPlaceholder size={"35"} />;
  } else {
    profilePicture = (
      <img src={props.userlite.profileImg} alt="" className="profilePicture__img" />
    );
  }
  const listItemNotFollowed = (
    <li className="userListItem">
      <div className="container" onClick={() => props.setDisplayUserId(props.userId)}>
        <div className="profilePicture">{profilePicture}</div>
        <h2 className="username">{props.userlite.name}</h2>
        <FollowerCount count={props.followerCount} />
      </div>
      <RiUserAddLine
        className="icon"
        size={iconSize}
        onClick={() => {
          modifyFollowerStatus("add", props.userlite.userId, props.userlite._id)
          setUserFollowed(!userFollowed)
        }}
      />
    </li>
  );

  const listItemFollowed = (
    <li className="userListItem">
      <div className="container" onClick={() => props.setDisplayUserId(props.userId)}>
        <div className="profilePicture">{profilePicture}</div>
        <h2 className="username">{props.userlite.name}</h2>
        <FollowerCount count={props.followerCount} />
      </div>
      <RiUserFill
        className="icon"
        size={iconSize}
        onClick={() => {
          modifyFollowerStatus("remove", props.userlite.userId, props.userlite._id)
          setUserFollowed(!userFollowed)
        }}
      />
    </li>
  );

  if (userFollowed) {
    return listItemFollowed;
  } else {
    return listItemNotFollowed;
  }
}
