import Widget from "../Widget/Widget";
import { BiLock } from "react-icons/bi";
import "./WidgetGrid.scss";

const WidgetGrid = (props) => {
  const widgets = [];
  let counter = 0;

  props.profileData.widgetList.map((widget) => {
    const newWidget = (
      <Widget
        key={counter}
        type={widget.type}
        title={widget.title}
        privacy={widget.privacy}
        data={widget.data}
        profileData={props.profileData}
        owner={props.owner}
        setPlayTrack={props.setPlayTrack}
      />
    );
    if (props.owner) {
      if (widget.addedToProfile) {
        widgets.push(newWidget);
        counter++;
      }
    } else {
      if (widget.privacy !== "Private") {
        widgets.push(newWidget);
        counter++;
      }
    }
  });

  if (counter > 0) {
    return <div className="widgetGrid">{widgets}</div>;
  } else {
    return (
    <div className="emptyGrid">
      <BiLock size="80" />
      <span>Widgets Locked</span>
    </div>
    );
  }
};

export default WidgetGrid;
