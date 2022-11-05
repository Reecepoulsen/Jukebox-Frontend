import Widget from "../Widget/Widget";
import "./WidgetGrid.scss";

const WidgetGrid = (props) => {
  const widgets = [];
  let counter = 0;

  props.profileData.widgetList.map((widget) => {
    if (widget.addedToProfile) {
      widgets.push(
        <Widget
          key={counter}
          type={widget.type}
          title={widget.title}
          privacy={widget.privacy}
          data={widget.data}
          profileData={props.profileData}
        />
      );
    }
    counter++;
  })

  return <div className="widgetGrid">{widgets}</div>;
};

export default WidgetGrid;
