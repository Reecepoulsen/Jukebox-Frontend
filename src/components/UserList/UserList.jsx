import UserListItem from "../UserListItem/UserListItem";
import "./UserList.scss";

export default function UserList(props) {
  let listItems = [];
  let counter = 0;
  window.scrollTo(0, 0);

  const profileData = JSON.parse(localStorage.getItem('profileData'));
  const curUsersId = profileData.userId;
  props.userList.map((user) => {
    if (user.userId !== curUsersId) {
      listItems.push(
        <UserListItem
          key={counter}
          profileImage={user.profileImg}
          username={user.name}
          followerCount={user.followerCount}
          isFollowed={user.isFollowed}
          userId={user.userId}
          setDisplayUserId={props.setDisplayUserId}
        />
      );
      counter++;
    }
  });

  return <ul className="userList">{listItems}</ul>;
}
