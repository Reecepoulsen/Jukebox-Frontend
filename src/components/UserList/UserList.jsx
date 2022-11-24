import UserListItem from "../UserListItem/UserListItem";
import "./UserList.scss";

export default function UserList(props) {
  let listItems = [];
  let counter = 0;
  window.scrollTo(0, 0);

  props.userList.map((user) => {
    listItems.push(
      <UserListItem
        key={counter}
        profileImage={user.profileImg}
        username={user.name}
        followerCount={user.followerCount}
        isFollowed={user.isFollowed}
      />
    );
    counter++;
  });

  return <ul className="userList">{listItems}</ul>;
}
