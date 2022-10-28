import './ArtistScrolling.scss'

const ArtistScrolling = ({artist}) => {
  return (
    <marquee className="artistScrolling" scrollamount="4">
      {artist}
    </marquee>
  )
}

export default ArtistScrolling