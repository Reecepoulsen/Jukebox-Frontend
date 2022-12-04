import "./FollowerModal.scss";

import React, { useState } from "react";
import FollowerList from "../FollowerList/FollowerList";

export default function FollowerModal() {
  const [activeView, setActiveView] = useState("following");

  return (
    <div className="followerModal">
      <div className="followerModal__header">
        <h3
          className={`following ${activeView === "following" ? "active" : ""}`}
          onClick={() => setActiveView("following")}
        >
          Following
        </h3>
        <h3
          className={`followers ${activeView === "followers" ? "active" : ""}`}
          onClick={() => setActiveView("followers")}
        >
          Followers
        </h3>
      </div>
      <FollowerList listType={activeView}/>
    </div>
  );
}
