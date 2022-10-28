import { useState, useEffect } from "react";
import { getProfileData } from "../../helpers/getProfileData";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import WidgetGrid from "../WidgetGrid/WidgetGrid";

const Profile = (props) => {
  const [tempWidgetList, setTempWidgetList] = useState(props.allWidgets);

  useEffect(() => {
    const fetchData = async () => {
      props.setProfileData(await getProfileData());
    };
    fetchData();
  }, []);

  if (props.profileData != null) {
    return (
      <div className="profile">
        <ProfileHeader
          profilePic={props.profileData.profileImgUrl}
          bannerPic={props.profileData.bannerImgUrl}
        />
        <ProfileInfo
          name={props.profileData.displayName}
          followerCount={props.profileData.followerCount}
          hitCount={props.profileData.hitCount}
          tempWidgetList={tempWidgetList}
          setTempWidgetList={setTempWidgetList}
        />
        <WidgetGrid
          profileData={props.profileData}
          tempWidgetList={tempWidgetList}
          setTempWidgetList={setTempWidgetList}
        />
      </div>
    );
  } else {
    // Return a template version of the profile
    return <div>No profile data</div>
  }
};

export default Profile;
