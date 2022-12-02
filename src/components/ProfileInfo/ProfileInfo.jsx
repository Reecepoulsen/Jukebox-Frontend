import FollowerCount from "../FollowerCount/FollowerCount";
import HitCount from "../HitCount/HitCount";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import "./ProfileInfo.scss";
import GenModal from "../GenModal/GenModal";
import AvailableWidgetList from "../availableWidgetList/availableWidgetList";

const ProfileInfo = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (props.owner) {
    return (
      <div className="profileInfo">
        <div className="profileInfo__Name">{props.name}</div>
        <FollowerCount count={props.followerCount} />
        <HitCount count={props.hitCount} />
        <IoMdAdd
          className="profileInfo__addWidget"
          size="45"
          onClick={() => setModalIsOpen(!modalIsOpen)}
          style={{
            cursor: "pointer",
          }}
        />
        <GenModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          body={
            <AvailableWidgetList
              widgetList={props.widgetList}
              setModalIsOpen={setModalIsOpen}
            />
          }
        />
      </div>
    );
  } else {
    return (
      <div className="profileInfo">
        <div className="profileInfo__Name">{props.name}</div>
        <FollowerCount count={props.followerCount} />
        <HitCount count={props.hitCount} />
      </div>
    );
  }
};

export default ProfileInfo;
