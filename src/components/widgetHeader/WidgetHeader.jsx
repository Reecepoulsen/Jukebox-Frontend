import WidgetTitle from "../WidgetTitle/WidgetTitle";
import PrivacyTag from "../PrivacyTag/PrivacyTag";
import "./WidgetHeader.scss";
import { useState } from "react";

const WidgetHeader = ({ title, privacy }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
      className="widgetHeader"
    >
      <div className="widgetHeader__title">
        <WidgetTitle
          onClick={() => setShowEdit(!showEdit)}
          title={title}
          showEdit={showEdit}
        />
      </div>
      <PrivacyTag text={privacy} />
    </div>
  );
};

export default WidgetHeader;
