import { FiEdit } from "react-icons/fi";
import "./WidgetTitle.scss";

const WidgetTitle = ({ title, showEdit}) => {
  return (
    <div className="widgetTitle">
      <h1
        className="widgetTitle__text"
      >
        {title}
      </h1>
      {showEdit && <FiEdit className="widgetTitle__icon" size="20" />}
    </div>
  );
};

export default WidgetTitle;
