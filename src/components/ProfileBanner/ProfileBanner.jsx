import './ProfileBanner.scss'

const ProfileBanner = ({imgSrc}) => {
  return (
    <div className="profileBanner">
      <img src={imgSrc} alt="Profile Banner" />
    </div>
  )
}

export default ProfileBanner;