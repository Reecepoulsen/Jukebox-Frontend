import ProfilePicPlaceholder from "../ProfilePicPlaceholder/ProfilePicPlaceholder";
import "./ProfilePicture.scss";

const ProfilePicture = ({ imgSrc }) => {
  let profilePicture = null;
  if (imgSrc === "None") {
    profilePicture = <ProfilePicPlaceholder size={"50"} />;
  } else {
    profilePicture = <img src={imgSrc} alt="Profile Picture" />;
  }
  return <div className="profilePicture">{profilePicture}</div>;
};

export default ProfilePicture;
