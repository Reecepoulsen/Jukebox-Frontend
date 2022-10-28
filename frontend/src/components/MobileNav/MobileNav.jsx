import { FiUser } from "react-icons/fi";
import { HiLink } from "react-icons/hi";
import { RiDiscLine } from "react-icons/ri";
import { CgFeed } from "react-icons/cg";
import "./MobileNav.scss";
import { getProfileData } from "../../helpers/getProfileData";

const MobileNav = (props) => {
  const size = "30";
  return (
    <div className="mobileNav">
      <i
        className="mobileNav__icon active"
        onClick={async () => {
          const profileData = await getProfileData();
          props.setProfileData(profileData);
        }}
      >
        <FiUser size={size} />
      </i>
      <i className="mobileNav__icon">
        <HiLink size={size} />
      </i>
      <i className="mobileNav__icon">
        <RiDiscLine size={size} />
      </i>
      <i className="mobileNav__icon">
        <CgFeed size={size} />
      </i>
    </div>
  );
};

export default MobileNav;
