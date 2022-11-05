import './CoverArt.scss';

const CoverArt = ({imgSrc, albumName}) => {
  return(
    <div className="coverArt">
      <img src={imgSrc} alt={`${albumName}'s cover art`} />
    </div>
  )
}

export default CoverArt;