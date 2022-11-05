import { useState, useEffect } from "react";
import { getProfileData } from "../../helpers/getProfileData";
import Loading from "../Loading/Loading";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import WidgetGrid from "../WidgetGrid/WidgetGrid";

const Profile = (props) => {
  const [widgetList, setWidgetList] = useState(null);
  const [profileData, setProfileData] = useState(
    JSON.parse(localStorage.getItem("profileData"))
  );
  const [updatedProfileData, setUpdatedProfileData] = useState(false);
  const [loading, setLoading] = useState(true);

  // Blocking function to get data from backend
  const fetchData = async () => {
    const result = await getProfileData(props.loginToken);
    setWidgetList(result.widgetList);
    console.log("widgetList state is", widgetList);
    localStorage.setItem("profileData", JSON.stringify(result));
    setProfileData(result);
  };

  useEffect(() => {
    if (
      profileData === null ||
      profileData === "undefined" ||
      profileData === undefined ||
      profileData === "null"
    ) {
      fetchData();
    } else {
      if (!updatedProfileData) {
        console.log("Running background profile update");
        fetchData();
        setUpdatedProfileData(true);
      }
      setLoading(false);
    }
  }, [profileData]);

  if (loading) {
    return <Loading />;
  } else {
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
          widgetList={widgetList}
          setWidgetList={widgetList}
        />
        <WidgetGrid
          profileData={profileData}
          widgetList={widgetList}
          setWidgetList={setWidgetList}
        />
      </div>
    );
  }
};

export default Profile;
