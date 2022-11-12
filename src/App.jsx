import { useEffect, useState } from "react";
import GreetingScreen from "./components/GreetingScreen/GreetingScreen";
import ConnectSpotify from "./components/ConnectSpotify/ConnectSpotify";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import getSpotifyToken from "./helpers/getSpotifyToken";
import Main from "./components/Main/Main";
import { checkUserSpotifyToken } from "./helpers/checkUserSpotifyToken";
import Loading from "./components/Loading/Loading";

function App() {
  const [loginToken, setLoginToken] = useState(
    localStorage.getItem("loginToken")
  );
  const [connectedSpotify, setConnectedSpotify] = useState(
    localStorage.getItem("connectedSpotify")
  )
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlQueryString = window.location.search;

    if (urlQueryString.includes("?code=")) {
      const spotifyCode = urlQueryString.split("=")[1];
      getSpotifyToken(spotifyCode, loginToken, setConnectedSpotify).then(() => {
        window.location = '/'
      });
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const result = await checkUserSpotifyToken(loginToken);
    console.log("User' spotify token is", result)
    if (result === "No Token"){
      console.log("No token")
      setConnectedSpotify(false);
    } else {
      console.log("Token is present")
      setConnectedSpotify(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loginToken !== "undefined" && loginToken !== null && loginToken !== 'null') {
      if (connectedSpotify === 'false' || connectedSpotify === false) {
        // Haven't connected spotify but we are logged in
        fetchData();
      }
    }
    localStorage.setItem("loginToken", loginToken);
  }, [loginToken]);

  

  useEffect(() => {
    // replace initial localstorage null state with false
    if (connectedSpotify === 'null' || connectedSpotify === null || connectedSpotify === 'undefined')
    {
      console.log("Setting connectedSpotify to false because of initial null")
      setConnectedSpotify(false);
      return
    }

    // otherwise, keep local storage in sync with application state
    localStorage.setItem('connectedSpotify', connectedSpotify);
  }, [connectedSpotify])

  // Possible app bodies to return based off of login state
  const connectSpotifyScreen = (
    <div className="App">
      <ConnectSpotify />
    </div>
  );

  const loginScreen = (
    <div className="App">
      <GreetingScreen setLoginToken={setLoginToken} />
    </div>
  );

  const appScreen = (
    <div className="App">
      <Main 
        loginToken={loginToken}
        setLoginToken={setLoginToken}
        setConnectedSpotify={setConnectedSpotify}
      />
    </div>
  );

  const errorScreen = (
    <div className="App">
      <ErrorPage />
    </div>
  );

  // console.log("LoginToken is ", loginToken);
  if (loginToken == "undefined" || loginToken == null || loginToken == 'null') {
    // user not logged in
    return loginScreen;
  } else {
    if (connectedSpotify === 'null' || connectedSpotify === 'undefined') {
      return errorScreen;
    } else if (connectedSpotify === 'false' || connectedSpotify === false) {
      // User logged in but spotify account isn't connected
      if (loading) {
        return <div className="App"><Loading /></div> 
      } else {
        return connectSpotifyScreen;
      }
    } else {
      // User logged in and connected to spotify
      return appScreen;
    }
  }
}

export default App;
