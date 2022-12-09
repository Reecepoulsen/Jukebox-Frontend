import FollowerCount from "../FollowerCount/FollowerCount";
import { RiUserAddLine, RiUserFill } from "react-icons/ri";
import "./UserListItem.scss";
import { useState, useEffect } from "react";
import { Timeout } from "../../helpers/abortController";
import ProfilePicPlaceholder from "../ProfilePicPlaceholder/ProfilePicPlaceholder";

const modifyFollowStatus = async (operation, userId, userliteId) => {
  const payload = {
    operation: operation,
    followUserId: userId,
    followUserliteId: userliteId,
  };

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/follow/status`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        "Content-Type": "application/json",
      },
      signal: Timeout(15).signal,
      body: JSON.stringify(payload),
    }
  ).then((res) => res.json());

  console.log("Result of modifyFollowStatus", response);
};

export default function UserListItem(props) {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  const [userFollowed, setUserFollowed] = useState(props.isFollowed);
  const iconSize = 28;

  let profilePicture = null;
  if (props.userlite.profileImg === "None") {
    profilePicture = <ProfilePicPlaceholder size={"35"} />;
  } else {
    profilePicture = (
      <img
        src={props.userlite.profileImg}
        alt=""
        className="profilePicture__img"
      />
    );
  }

  const listItemNotFollowed = (
    <li className="userListItem">
      <div
        className="container"
        onClick={() =>
          props.setDisplayUserId({
            userId: props.userlite.userId,
            isFollowed: userFollowed,
          })
        }
      >
        <div className="profilePicture">{profilePicture}</div>
        <h2 className="username">{props.userlite.name}</h2>
        <FollowerCount count={props.followerCount} />
      </div>
      <RiUserAddLine
        className="icon"
        size={iconSize}
        onClick={async () => {
          await modifyFollowStatus(
            "add",
            props.userlite.userId,
            props.userlite._id
          ).catch((err) => setError(err));
          setUserFollowed(!userFollowed);
        }}
      />
    </li>
  );

  const listItemFollowed = (
    <li className="userListItem">
      <div
        className="container"
        onClick={() =>
          props.setDisplayUserId({
            userId: props.userlite.userId,
            isFollowed: userFollowed,
          })
        }
      >
        <div className="profilePicture">{profilePicture}</div>
        <h2 className="username">{props.userlite.name}</h2>
        <FollowerCount count={props.followerCount} />
      </div>
      <RiUserFill
        className="icon"
        size={iconSize}
        onClick={async () => {
          await modifyFollowStatus(
            "remove",
            props.userlite.userId,
            props.userlite._id
          ).catch((err) => setError(err));
          setUserFollowed(!userFollowed);
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
