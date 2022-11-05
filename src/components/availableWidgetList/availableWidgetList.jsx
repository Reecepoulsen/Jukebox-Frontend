import "./availableWidgetList.scss";

const AvailableWidgetList = ({ tempWidgetList, setTempWidgetList, setModalIsOpen }) => {
  const availableWidgets = [];

  const widgetMover = (w) => {
    console.log(tempWidgetList)
    const newTempWidgetList = tempWidgetList;
    newTempWidgetList.map((widget) => {
      if (widget == w) {
        widget.addedToProfile = true;
      }
    })
    setTempWidgetList(newTempWidgetList);
  }

  tempWidgetList.map((w) => {
    if (w.addedToProfile == false) {
      availableWidgets.push(<li onClick={() => {widgetMover(w); setModalIsOpen(false)}}>{w.title}</li>)
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
