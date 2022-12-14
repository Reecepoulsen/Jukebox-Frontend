import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import ProfileLite from "../ProfileLite/ProfileLite";
import SearchBar from "../SearchBar/SearchBar";
import UserList from "../UserList/UserList";
import { Timeout } from "../../helpers/abortController";
import "./Connect.scss";

const getUserList = async () => {
  const result = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/profile/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
      signal: Timeout(15).signal,
    }
  ).then((res) => res.json());
  return result;
};

export default function Connect(props) {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  const [userList, setUserList] = useState(null);
  const [displayUserId, setDisplayUserId] = useState(null);

  const connectView = (
    <div className="connectView">
      <SearchBar searchList={userList} setUserList={setUserList} />
      <UserList userList={userList} setDisplayUserId={setDisplayUserId} />
    </div>
  );

  useEffect(() => {
    getUserList()
      .then((res) => {
        setUserList(res.data);
        localStorage.setItem("userList", JSON.stringify(res.data));
      })
      .catch((err) => setError(err));
  }, []);

  if (!userList) {
    return (
      <div className="userList__loadingContainer">
        <Loading />
      </div>
    );
  } else {
    if (!displayUserId) {
      return connectView;
    } else {
      console.log("displayUserId is", displayUserId);
      return (
        <ProfileLite
          userId={displayUserId.userId}
          isFollower={displayUserId.isFollowed}
          setDisplayUserId={setDisplayUserId}
          setPlayerList={props.setPlayerList}
          setPlayerTrackIndex={props.setPlayerTrackIndex}
        />
      );
    }
  }
}
