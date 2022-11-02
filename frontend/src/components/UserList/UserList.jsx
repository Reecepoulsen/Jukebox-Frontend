import UserListItem from "../UserListItem/UserListItem";
import "./UserList.scss";

export default function UserList(props) {
  let listItems = [];

  props.userList.map((user) => {
    listItems.push(
      <UserListItem
        profileImage={user.profileImage}
        username={user.username}
        followerCount={user.followerCount}
        isFollowed={user.isFollowed}
      />
    );
  });

  return <ul className="userList">{listItems}</ul>;
}
