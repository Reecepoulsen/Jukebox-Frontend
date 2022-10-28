import ArtistScrolling from "../ArtistScrolling/ArtistScrolling";
import CoverArt from "../CoverArt/CoverArt";
import HitCount from "../HitCount/HitCount";
import './SongSpotlight.scss'

const SongSpotlight = ({songData}) => {
  
  return (
    <div className="songSpotlight">
      <CoverArt imgSrc={songData.album.imgSrc} albumName="Filler" />
      <HitCount count={songData.hitCount} />
      <ArtistScrolling artist={songData.artist} />
    </div>
  )
}

export default SongSpotlight;