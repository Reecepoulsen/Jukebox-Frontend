import { useEffect } from "react";
import { useState } from "react";
import FollowerListItem from "../FollowerListItem/FollowerListItem";
import Loading from "../Loading/Loading";
import { Timeout } from "../../helpers/abortController";
import "./FollowerList.scss";

const loadUserList = async (route) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/${route}/get`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
      signal: Timeout(15).signal,
    }
  ).then((res) => res.json());
  return response.userList;
};

export default function FollowerList(props) {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    setLoading(true);
    loadUserList(props.listType)
      .then((result) => {
        setUserList(result);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [props.listType]);

  if (loading) {
    return (
      <ul className="followerList">
        <Loading />
      </ul>
    );
  } else {
    const users = [];
    let counter = 0;
    userList.forEach((user) => {
      users.push(<FollowerListItem key={counter} follower={user} />);
      counter++;
    });
    return <ul className="followerList">{users}</ul>;
  }
}
