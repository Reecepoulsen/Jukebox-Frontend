import BasicButton from '../BasicButton/BasicButton';
import './ConnectSpotify.scss';

const ConnectSpotify = (props) => {
  return (
    <div className="connectSpotify">
      <div className="container">
        <h2>Connect Spotify</h2>
        <p>
          Welcome to Jukebox! 
          Please connect your Spotify account.
        </p>
        <a className="basicButton" href={`http://localhost:8080/auth/connectSpotify`}>Spotify Login</a>
      </div>
    </div>
  )
}

export default ConnectSpotify;