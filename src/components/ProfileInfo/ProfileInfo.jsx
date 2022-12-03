import FollowerCount from "../FollowerCount/FollowerCount";
import HitCount from "../HitCount/HitCount";
import { useState } from "react";
import "./ProfileInfo.scss";
import GenModal from "../GenModal/GenModal";
import { FiUsers } from "react-icons/fi";
import FollowerList from "../FollowerList/FollowerList";

const ProfileInfo = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (props.owner) {
    return (
      <div className="profileInfo">
        <div className="profileInfo__Name">{props.name}</div>
        <FollowerCount count={props.followerCount} />
        <HitCount count={props.hitCount} />
        <FiUsers
          className="profileInfo__addWidget"
          size="35"
          onClick={() => setModalIsOpen(!modalIsOpen)}
          style={{
            cursor: "pointer",
          }}
        />
        <GenModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          body={
            <div>
              <h2
                style={{
                  marginBottom: "10px",
                  color: "rgb(0, 203, 230)"
                }}
              >
                Following
              </h2>
              <FollowerList />
            </div>
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
