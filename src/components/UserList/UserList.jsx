import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import UserListItem from "../UserListItem/UserListItem";
import "./UserList.scss";

const loadFollowing = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/following/get`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    }
  ).then((res) => res.json());
  return response.userDataStructure;
};

export default function UserList(props) {
  const [loading, setLoading] = useState(true);
  const [followingData, setFollowingData] = useState(null);
  window.scrollTo(0, 0);

  useEffect(() => {
    if (!followingData) {
      loadFollowing().then((res) => {
        setFollowingData(res);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    let listItems = [];
    let counter = 0;

    const profileData = JSON.parse(localStorage.getItem("profileData"));
    const curUsersId = profileData.userId;
    props.userList.map((userlite) => {
      if (userlite.userId !== curUsersId) {
        const followerCount = userlite.followers
          ? Object.keys(userlite.followers).length
          : 0;
        listItems.push(
          <UserListItem
            key={counter}
            userlite={userlite}
            isFollowed={followingData[userlite.userId]}
            followerCount={followerCount}
            setDisplayUserId={props.setDisplayUserId}
          />
        );
        counter++;
      }
    });
    return <ul className="userList">{listItems}</ul>;
  }
}
