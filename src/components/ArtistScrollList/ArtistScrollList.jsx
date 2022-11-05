import ArtistScrollListTile from "../ArtistScrollListTile/ArtistScrollListTile";
import "./ArtistScrollList.scss";

const ArtistScrollList = ({ artistList, setSpotlightArtist }) => {
  let listItems = [];
  let counter = 0;

  artistList.map((a) => {
    listItems.push(
      <li onClick={() => setSpotlightArtist(a)} key={counter}>
        <ArtistScrollListTile artistData={a} />
      </li>
    )
    counter++;
  });

  return <ul className="artistScrollList">{listItems}</ul>;
};

export default ArtistScrollList;
