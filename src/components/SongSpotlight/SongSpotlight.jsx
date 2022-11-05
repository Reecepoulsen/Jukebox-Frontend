import ArtistScrolling from "../ArtistScrolling/ArtistScrolling";
import CoverArt from "../CoverArt/CoverArt";
import HitCount from "../HitCount/HitCount";
import './SongSpotlight.scss'

const SongSpotlight = ({songData}) => {
  let artistString = '';
  songData.artists.map(artist => artistString = artistString + `${artist.name}, `)
  artistString = artistString.slice(0, -2);
  artistString = songData.name + " - " + artistString;
  return (
    <div className="songSpotlight">
      <CoverArt imgSrc={songData.album.images[0].url} albumName="Filler" />
      <HitCount count={0} />
      <ArtistScrolling artist={artistString} />
    </div>
  )
}

export default SongSpotlight;