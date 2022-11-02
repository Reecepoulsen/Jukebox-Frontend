import BasicButton from '../BasicButton/BasicButton';
import './ConnectSpotify.scss';

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
];
const queryString = `response_type=code&client_id=${
  '1bdca04f2bf24fc0a5860fb2f06388d1'
}&scope=${scopes.join(
  " "
)}&redirect_uri=http://localhost:3000&show_dialog=true`;

const ConnectSpotify = (props) => {
  return (
    <div className="connectSpotify">
      <div className="container">
        <h2>Connect Spotify</h2>
        <p>
          Welcome to Jukebox! 
          Please connect your Spotify account.
        </p>
        <a className="basicButton" href={"https://accounts.spotify.com/authorize?" + queryString}>Spotify Login</a>
      </div>
    </div>
  )
}

export default ConnectSpotify;