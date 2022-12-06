import WidgetPlaylistList from "../WidgetPlaylistList/WidgetPlaylistList";
import WidgetFavSongs from "../WidgetFavSongs/WidgetFavSongs";
import WidgetHeader from "../widgetHeader/WidgetHeader";
import "./Widget.scss";
import WidgetArtistSpotlight from "../WidgetArtistSpotlight/WidgetArtistSpotlight";

const Widget = (props) => {
  const determineBody = (type) => {
    if (type === "songList") {
      return (
        <WidgetFavSongs
          songs={props.data}
          setPlayerList={props.setPlayerList}
          setPlayerTrackIndex={props.setPlayerTrackIndex}
          playerTrackIndex={props.playerTrackIndex}
        />
      );
    } else if (type === "playlist") {
      return (
        <WidgetPlaylistList
          playlists={props.data}
          setPlayerList={props.setPlayerList}
          setPlayerTrackIndex={props.setPlayerTrackIndex}
          playerTrackIndex={props.playerTrackIndex}
        />
      );
    } else if (type === "artistSpotlight") {
      return (
        <WidgetArtistSpotlight
          artistList={props.data}
          setPlayerList={props.setPlayerList}
          setPlayerTrackIndex={props.setPlayerTrackIndex}
          playerTrackIndex={props.playerTrackIndex}
        />
      );
    }
  };

  let blurWidgetContent = false;
  if (props.privacy === "Followers" && !props.owner && !props.isFollower) {
    blurWidgetContent = true;
  }

  return (
    <div className="widget">
      <WidgetHeader
        title={props.title}
        privacy={props.privacy}
        owner={props.owner}
      />
      {blurWidgetContent && <div className="followMsg">Follow to View</div>}
      <div className={`widget__body ${blurWidgetContent ? "blurWidget" : ""}`}>
        {determineBody(props.type)}
      </div>
    </div>
  );
};

export default Widget;
