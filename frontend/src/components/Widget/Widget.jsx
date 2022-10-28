import WidgetPlaylistList from "../WidgetPlaylistList/WidgetPlaylistList";
import WidgetFavSongs from "../WidgetFavSongs/WidgetFavSongs";
import WidgetHeader from "../widgetHeader/WidgetHeader";
import "./Widget.scss";
import WidgetArtistSpotlight from "../WidgetArtistSpotlight/WidgetArtistSpotlight";

const Widget = (props) => {
  const determineBody = (type) => {
    if (type === 'songList'){
      return <WidgetFavSongs songs={props.data} profileData={props.profileData}/>;
    } else if (type === 'playlist') {
      return <WidgetPlaylistList playlists={props.data} profileData={props.profileData}/>;
    } else if (type === 'artistSpotlight'){
      return <WidgetArtistSpotlight artistList={props.data} profileData={props.profileData}/>
    }
  } 

  return (
    <div className="widget">
      <WidgetHeader title={props.title} privacy={props.privacy} />
      <div className="widget__body">{determineBody(props.type)}</div>
    </div>
  )
};

export default Widget;
