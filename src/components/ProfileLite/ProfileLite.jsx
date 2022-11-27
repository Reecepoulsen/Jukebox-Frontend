import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import WidgetGrid from "../WidgetGrid/WidgetGrid";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "./ProfileLite.scss";

const loadProfile = async (userId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    }
  ).then(res => res.json());
  console.log("response in loadProfile", response);
  return response.data;
};

const ProfileLite = (props) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileData === null) {
      loadProfile(props.userId).then((data) => {
        console.log("data received from load profileLite", data)
        setProfileData(data);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="loadingContainer">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="profile">
        <div className="backArrow" onClick={() => props.setDisplayUserId(null)}>
          <MdOutlineArrowBackIosNew size="20" />
          <span>Search</span>
        </div>
        <ProfileHeader
          profilePic={profileData.profileImgUrl}
          bannerPic={profileData.bannerImgUrl}
          setLoginToken={false}
          setConnectedSpotify={false}
          owner={false}
        />
        <ProfileInfo
          name={profileData.displayName}
          followerCount={profileData.followerCount}
          hitCount={profileData.hitCount}
          widgetList={profileData.widgetList}
          owner={false}
        />
        <WidgetGrid profileData={profileData} owner={false} setPlayTrack={props.setPlayTrack}/>
      </div>
    );
  }
};

export default ProfileLite;
