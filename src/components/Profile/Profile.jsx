import { useState, useEffect } from "react";
import { getProfileData } from "../../helpers/getProfileData";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loading from "../Loading/Loading";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import WidgetGrid from "../WidgetGrid/WidgetGrid";

const Profile = (props) => {
  if (
    localStorage.getItem("profileData") === undefined ||
    localStorage.getItem("profileData") === "undefined"
  ) {
    localStorage.setItem("profileData", null);
  }
  const [profileData, setProfileData] = useState(
    JSON.parse(localStorage.getItem("profileData"))
  );
  const [updatedProfileData, setUpdatedProfileData] = useState(false);
  const [loading, setLoading] = useState(true);

  // Blocking function to get data from backend
  const fetchData = async () => {
    const result = await getProfileData(props.loginToken);
    console.log("Result from getProfileData");
    localStorage.setItem("profileData", JSON.stringify(result));
    setProfileData(result);
  };

  useEffect(() => {
    if (profileData === null || profileData === "null") {
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
    if (profileData === null || profileData === "null") {
      return <ErrorPage />;
    }
    return (
      <div className="profile">
        <ProfileHeader
          profilePic={profileData.profileImgUrl}
          bannerPic={profileData.bannerImgUrl}
          setLoginToken={props.setLoginToken}
          setConnectedSpotify={props.setConnectedSpotify}
        />
        <ProfileInfo
          name={profileData.displayName}
          followerCount={profileData.followerCount}
          hitCount={profileData.hitCount}
          widgetList={profileData.widgetList}
        />
        <WidgetGrid profileData={profileData} />
      </div>
    );
  }
};

export default Profile;
