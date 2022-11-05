import "./HitCount.scss";

const HitCount = ({ count }) => {
  return(
    <div className="hitCount">
      {`Hits: ${count}`}
    </div>
  )
};

export default HitCount;
