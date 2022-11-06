import "./availableWidgetList.scss";

const AvailableWidgetList = (props) => {
  const availableWidgets = [];

  props.widgetList.map((w) => {
    if (w.addedToProfile == false) {
      availableWidgets.push(<li onClick={() => props.setModalIsOpen(false)}>{w.title}</li>)
    }
  });

  return (
    <div className="availableWidgetList">
      <h2 className="availableWidgetList__title">Add A Widget</h2>
      <ul className="availableWidgetList__list">{availableWidgets}</ul>
    </div>
  );
};

export default AvailableWidgetList;
