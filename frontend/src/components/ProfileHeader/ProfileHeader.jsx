import ProfileBanner from '../ProfileBanner/ProfileBanner'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import './ProfileHeader.scss'

const ProfileHeader = ({profilePic, bannerPic}) => {
  return (
    <div className="profileHeader">
      <ProfilePicture imgSrc={profilePic} />
      <ProfileBanner imgSrc={bannerPic} />
    </div>
  )
}

export default ProfileHeader