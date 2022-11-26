import LogoutBtn from "../LogoutBtn/LogoutBtn";
import ProfileBanner from "../ProfileBanner/ProfileBanner";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import "./ProfileHeader.scss";

const ProfileHeader = (props) => {
  if (props.owner) {
    return (
      <div className="profileHeader">
        <ProfilePicture imgSrc={props.profilePic} />
        <ProfileBanner imgSrc={props.bannerPic} />
        <LogoutBtn
          setLoginToken={props.setLoginToken}
          setConnectedSpotify={props.setConnectedSpotify}
        />
      </div>
    );
  } else {
    return (
      <div className="profileHeader">
        <ProfilePicture imgSrc={props.profilePic} />
        <ProfileBanner imgSrc={props.bannerPic} />
      </div>
    );
  }
};

export default ProfileHeader;
