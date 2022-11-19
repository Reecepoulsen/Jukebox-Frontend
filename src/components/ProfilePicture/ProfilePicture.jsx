import "./ProfilePicture.scss";

const ProfilePicture = ({ imgSrc }) => {
  return (
    <div className="profilePicture">
      <img
        src={
          imgSrc === "None"
            ? "https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/Profile_avatar_placeholder_large.png?alt=media&token=602d1c6b-004c-4e8b-85a1-0d6d5fcddb7b"
            : imgSrc
        }
        alt="Profile Picture"
      />
    </div>
  );
};

export default ProfilePicture;
