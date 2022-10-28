import './ProfilePicture.scss'

const ProfilePicture = ({imgSrc}) => {
  return (
    <div className="profilePicture">
      <img src={imgSrc} alt="Profile Picture" />
    </div>
  )
}

export default ProfilePicture