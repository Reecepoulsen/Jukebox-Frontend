import { useEffect } from "react";
import { useState } from "react";
import FollowerListItem from "../FollowerListItem/FollowerListItem";
import Loading from "../Loading/Loading";
import UserListItem from "../UserListItem/UserListItem";
import "./FollowerList.scss";

const loadFollowers = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/followers/get`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    }
  ).then((res) => res.json());
  // console.log("Response from loadFollowers", response);
  return response.followerList;
};

export default function FollowerList() {
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    if (!followers) {
      loadFollowers().then((result) => {
        setFollowers(result);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    const followerList = [];

    console.log("Followers", followers);
    let counter = 0;
    followers.forEach(follower => {
      followerList.push(
        <FollowerListItem key={counter} follower={follower}/>
      );
      counter++;
    });
    return <ul className="followerList">{followerList}</ul>;
  }
}
