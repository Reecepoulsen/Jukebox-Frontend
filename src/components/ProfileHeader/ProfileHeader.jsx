import LogoutBtn from "../LogoutBtn/LogoutBtn";
import ProfileBanner from "../ProfileBanner/ProfileBanner";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import "./ProfileHeader.scss";

const ProfileHeader = (props) => {
  if (props.owner) {
    return (
      <div className="profileHeader">
        <ProfilePicture imgSrc={props.profileData.profileImgUrl} />
        <ProfileBanner profileData={props.profileData} />
        <LogoutBtn
          setLoginToken={props.setLoginToken}
          setConnectedSpotify={props.setConnectedSpotify}
        />
      </div>
    );
  } else {
    return (
      <div className="profileHeader">
        <ProfilePicture imgSrc={props.profileData.profileImgUrl} />
        <ProfileBanner profileData={props.profileData} />
      </div>
    );
  }
};

export default ProfileHeader;
