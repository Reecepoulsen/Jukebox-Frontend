import { useEffect, useState } from "react";
import GreetingScreen from "./components/GreetingScreen/GreetingScreen";
import ConnectSpotify from "./components/ConnectSpotify/ConnectSpotify";
import { getUser } from "./helpers/getUser";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import getSpotifyToken from "./helpers/getSpotifyToken";
import Main from "./components/Main/Main";

function App() {
  const [loginToken, setLoginToken] = useState(
    localStorage.getItem("loginToken")
  );
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const urlQueryString = window.location.search;

    if (urlQueryString.includes("?code=")) {
      const spotifyCode = urlQueryString.split("=")[1];
      getSpotifyToken(spotifyCode, loginToken).then(() => {
        window.location = '/'
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loginToken", loginToken);
  }, [loginToken]);

  // useEffect(() => console.log("userData changed", userData), [userData]);

  // Possible app bodies to return based off of login state
  const connectSpotifyScreen = (
    <div>
      <ConnectSpotify userData={userData} loginToken={loginToken} />
    </div>
  );

  const loginScreen = (
    <div className="App">
      <GreetingScreen setUserData={setUserData} setLoginToken={setLoginToken} />
    </div>
  );

  const appScreen = (
    <div className="App">
      <Main 
        allWidgets={allWidgets}
        loginToken={loginToken}
        setLoginToken={setLoginToken}
      />
    </div>
  );

  const errorScreen = (
    <div className="App">
      <ErrorPage setLoginToken={setLoginToken} />
    </div>
  );

  // console.log("LoginToken is ", loginToken);
  if (loginToken == "undefined" || loginToken == null || loginToken == 'null') {
    // user not logged in
    return loginScreen;
  } else {
    if (userData == null) {
      return errorScreen;
    } else if (userData.spotifyAccessToken === "No Token") {
      // User logged in but spotify account isn't connected
      return connectSpotifyScreen;
    } else {
      // User logged in and connected to spotify
      return appScreen;
    }
  }
}

export default App;
