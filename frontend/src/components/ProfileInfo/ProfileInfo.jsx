import FollowerCount from "../FollowerCount/FollowerCount";
import HitCount from "../HitCount/HitCount";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import "./ProfileInfo.scss";
import GenModal from "../GenModal/GenModal";
import AvailableWidgetList from "../availableWidgetList/availableWidgetList";

const ProfileInfo = ({
  name,
  followerCount,
  hitCount,
  tempWidgetList,
  setTempWidgetList,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="profileInfo">
      <div className="profileInfo__Name">{name}</div>
      <FollowerCount count={followerCount} />
      <HitCount count={hitCount} />
      <IoMdAdd
        className="profileInfo__addWidget"
        size="45"
        onClick={() => setModalIsOpen(!modalIsOpen)}
      />
      <GenModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        body={
          <AvailableWidgetList
            tempWidgetList={tempWidgetList}
            setTempWidgetList={setTempWidgetList}
            setModalIsOpen={setModalIsOpen}
          />
        }
      />
    </div>
  );
};

export default ProfileInfo;
