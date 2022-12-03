import ProfilePicPlaceholder from "../ProfilePicPlaceholder/ProfilePicPlaceholder";
import "./FollowerListItem.scss";

export default function FollowerListItem(props) {
  return (
    <li className="followerListItem">
      <div className="followerListItem__profilePic">
        {props.follower.profileImg !== "None" ? (
          <img src={props.follower.profileImg} alt="" />
        ) : (
          <ProfilePicPlaceholder size={35} />
        )}
      </div>
      <span className="followerListItem__name">{props.follower.name}</span>
    </li>
  );
}
