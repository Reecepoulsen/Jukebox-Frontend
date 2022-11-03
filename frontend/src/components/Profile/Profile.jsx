import { useState, useEffect } from "react";
import { getProfileData } from "../../helpers/getProfileData";
import Loading from "../Loading/Loading";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import WidgetGrid from "../WidgetGrid/WidgetGrid";

const Profile = (props) => {
  const [tempWidgetList, setTempWidgetList] = useState(props.allWidgets);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileData == null) {
      const fetchData = async () => {
        // console.log("Profile data before getProfileData", profileData)
        const result = await getProfileData(props.loginToken)
        // console.log("Result of get profile", result);
        setProfileData(result);
      }
      fetchData()
    } else {
      // console.log("Profile data is", profileData);
      setLoading(false);
    }
  }, [profileData]);

  if (loading) {
    return <Loading />
  } else {
    console.log("Else condition")
    return (
      <div className="profile">
        <ProfileHeader
          profilePic={profileData.profileImgUrl}
          bannerPic={profileData.bannerImgUrl}
          setLoginToken={props.setLoginToken}
        />
        <ProfileInfo
          name={profileData.displayName}
          followerCount={profileData.followerCount}
          hitCount={profileData.hitCount}
          tempWidgetList={tempWidgetList}
          setTempWidgetList={setTempWidgetList}
        />
        <WidgetGrid
          profileData={profileData}
          tempWidgetList={tempWidgetList}
          setTempWidgetList={setTempWidgetList}
        />
      </div>
    );
  }

};

export default Profile;
