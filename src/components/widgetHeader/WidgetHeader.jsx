import WidgetTitle from "../WidgetTitle/WidgetTitle";
import PrivacyTag from "../PrivacyTag/PrivacyTag";
import "./WidgetHeader.scss";
import { useState } from "react";

const WidgetHeader = ({ title, privacy, owner }) => {
  const [showEdit, setShowEdit] = useState(false);

  if (owner) {
    return (
      <div className="widgetHeader">
        <div
          onMouseEnter={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
          className="widgetHeader__title"
        >
          <WidgetTitle
            onClick={() => setShowEdit(!showEdit)}
            title={title}
            showEdit={showEdit}
          />
        </div>
        <PrivacyTag text={privacy} widgetTitle={title} />
      </div>
    );
  } else {
    return (
      <div className="widgetHeader">
        <div className="widgetHeader__title">
          <WidgetTitle
            onClick={() => setShowEdit(!showEdit)}
            title={title}
            showEdit={showEdit}
          />
        </div>
      </div>
    );
  }
};

export default WidgetHeader;
