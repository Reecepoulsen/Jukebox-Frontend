import Widget from "../Widget/Widget";
import "./WidgetGrid.scss";

const WidgetGrid = (props) => {
  const widgets = [];

  props.tempWidgetList.map((widget) => {
    if (widget.addedToProfile) {
      widgets.push(
        <Widget
          key={widget.id}
          type={widget.type}
          title={widget.title}
          privacy={widget.privacy}
          data={widget.data}
          profileData={props.profileData}
        />
      );
    }
  })

  return <div className="widgetGrid">{widgets}</div>;
};

export default WidgetGrid;