import { FiUser } from "react-icons/fi";
import { HiLink } from "react-icons/hi";
import { RiDiscLine } from "react-icons/ri";
import { CgFeed } from "react-icons/cg";
import "./MobileNav.scss";
import { useState } from "react";

const MobileNav = (props) => {
  const [activeIcon, setActiveIcon] = useState(props.currentView.type.name);
  const size = "30";

  const discoverIcon = (
    <i className="mobileNav__icon">
      <RiDiscLine size={size} />
    </i>
  );

  const feedIcon = (
    <i className="mobileNav__icon">
      <CgFeed size={size} />
    </i>
  );

  return (
    <div className="mobileNav">
      <i
        className={
          activeIcon === "Profile"
            ? "mobileNav__icon active"
            : "mobileNav__icon"
        }
        onClick={() => {
          setActiveIcon("Profile");
          props.setCurrentView(props.profileView);
        }}
      >
        <FiUser size={size} />
      </i>
      <i
        className={
          activeIcon === "Connect"
            ? "mobileNav__icon active"
            : "mobileNav__icon"
        }
        onClick={() => {
          setActiveIcon("Connect");
          props.setCurrentView(props.connectView);
        }}
      >
        <HiLink size={size} />
      </i>
      {/* {discoverIcon}
      {feedIcon} */}
    </div>
  );
};

export default MobileNav;
