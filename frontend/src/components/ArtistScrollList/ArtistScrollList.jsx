import ArtistScrollListTile from "../ArtistScrollListTile/ArtistScrollListTile";
import "./ArtistScrollList.scss";

const ArtistScrollList = ({ artistList, setSpotlightArtist }) => {
  let listItems = [];

  artistList.map((a) =>
    listItems.push(
      <li onClick={() => setSpotlightArtist(a)}>
        <ArtistScrollListTile artistData={a} />
      </li>
    )
  );

  return <ul className="artistScrollList">{listItems}</ul>;
};

export default ArtistScrollList;
