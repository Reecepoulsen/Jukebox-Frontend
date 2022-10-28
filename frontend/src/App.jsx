import { useEffect, useState } from "react";
import GreetingScreen from "./components/GreetingScreen/GreetingScreen";
import Profile from "./components/Profile/Profile";
import MobileNav from "./components/MobileNav/MobileNav";
import ConnectSpotify from "./components/ConnectSpotify/ConnectSpotify";
import { getProfileData } from "./helpers/getProfileData";
import { getUser } from "./helpers/getUser";
import ErrorPage from "./components/ErrorPage/ErrorPage";

// Dummy Data
const songData = [
  {
    id: 1,
    title: "Dry Blood",
    artist: "Highlnd, Alex Venegas",
    album: {
      title: "Dry Blood",
      imgSrc: "/testImages/dryBlood.jpg",
    },
    length: "3:34",
    hitCount: 1,
  },
  {
    id: 2,
    title: "Final Call",
    artist: "Rubika, Linn Sandin, Airmow",
    album: {
      title: "Final Call",
      imgSrc: "/testImages/finalCall.jpg",
    },
    length: "2:52",
    hitCount: 2,
  },
  {
    id: 3,
    title: "Better Off Alone - TENZO Remix",
    artist: "CADE, TENZO",
    album: {
      title: "Better Off Alone (TENZO Remix)",
      imgSrc: "/testImages/betterOffAlone.jpg",
    },
    length: "3:20",
    hitCount: 3,
  },
  {
    id: 4,
    title: "You (Itro Remix)",
    artist: "Alex Ferro, Itro",
    album: {
      title: "You (Itro Remix)",
      imgSrc: "/testImages/you.jpg",
    },
    length: "2:59",
    hitCount: 4,
  },
  {
    id: 5,
    title: "Run With Me",
    artist: "marco farouk, SPRNGBEATS, C4NDY, Chris Willis",
    album: {
      title: "Run With Me",
      imgSrc: "/testImages/runWithMe.jpg",
    },
    length: "3:07",
    hitCount: 5,
  },
  {
    id: 6,
    title: "If I Lose It All",
    artist: "Koen Fagen, Jorik Burema",
    album: {
      title: "If I Lose It All",
      imgSrc: "/testImages/ifILoseItAll.jpg",
    },
    length: "2:53",
    hitCount: 6,
  },
  {
    id: 7,
    title: "Halfway Down (with Ashley Drake)",
    artist: "SLANDER, Ashley Drake",
    album: {
      title: "Halfway Down (with Ashley Drake)",
      imgSrc: "/testImages/halfwayDown.jpg",
    },
    length: "5:10",
    hitCount: 7,
  },
  {
    id: 8,
    title: "Don't Let Me Let Go",
    artist: "Dillon Francis, ILLENIUM, EVAN GIIA",
    album: {
      title: "Dont Let Me Let Go",
      imgSrc: "/testImages/dontLetMeLetGo.jpg",
    },
    length: "3:25",
    hitCount: 8,
  },
  {
    id: 9,
    title: "Back 2 U (feat. WALK THE MOON) - William Black Remix",
    artist: "Steve Aoki, Boehm, WALK THE MOON, William Black",
    album: {
      title: "Back 2 U (feat. WALK THE MOON) - William Black Remix",
      imgSrc: "/testImages/back2U.jpg",
    },
    length: "3:58",
    hitCount: 9,
  },
  {
    id: 10,
    title: "Sleep Forever",
    artist: "Kris Sobanski, It Lives, It Breathers, Kaiser Sensei",
    album: {
      title: "Sleep Forever",
      imgSrc: "/testImages/sleepForever.jpg",
    },
    length: "3:29",
    hitCount: 10,
  },
];

const playlistData = [
  {
    id: 0,
    title: "Coding",
    image: "/testImages/coding.png",
    songs: ["Wouldn't Change A Thing", "Dry Blood", "Final Call"],
  },
  {
    id: 1,
    title: "Workout",
    image: "/testImages/workout.png",
    songs: ["Run Boy Run", "Never Give Up", "Twisted"],
  },
  {
    id: 2,
    title: "Discovered",
    image: "/testImages/discovered.png",
    songs: ["All That Really Matters", "Walk On Water", "Kill Me With Silence"],
  },
  {
    id: 3,
    title: "Mission Throwback",
    image: "/testImages/missionThrowback.png",
    songs: ["joy.", "Run Wild.", "Fix My Eyes"],
  },
  {
    id: 4,
    title: "Coding",
    image: "/testImages/coding.png",
    songs: ["Wouldn't Change A Thing", "Dry Blood", "Final Call"],
  },
  {
    id: 5,
    title: "Workout",
    image: "/testImages/workout.png",
    songs: ["Run Boy Run", "Never Give Up", "Twisted"],
  },
  {
    id: 6,
    title: "Discovered",
    image: "/testImages/discovered.png",
    songs: ["All That Really Matters", "Walk On Water", "Kill Me With Silence"],
  },
  {
    id: 7,
    title: "Mission Throwback",
    image: "/testImages/missionThrowback.png",
    songs: ["joy.", "Run Wild.", "Fix My Eyes"],
  },
  {
    id: 8,
    title: "Coding",
    image: "/testImages/coding.png",
    songs: ["Wouldn't Change A Thing", "Dry Blood", "Final Call"],
  },
  {
    id: 9,
    title: "Workout",
    image: "/testImages/workout.png",
    songs: ["Run Boy Run", "Never Give Up", "Twisted"],
  },
  {
    id: 10,
    title: "Discovered",
    image: "/testImages/discovered.png",
    songs: ["All That Really Matters", "Walk On Water", "Kill Me With Silence"],
  },
  {
    id: 11,
    title: "Mission Throwback",
    image: "/testImages/missionThrowback.png",
    songs: ["joy.", "Run Wild.", "Fix My Eyes"],
  },
];

const artistSpotlightData = [
  {
    id: 0,
    name: "Illenium",
    image: "/testImages/illenium.jpg",
    songList: ["Song 1", "Song 2", "Song 3"],
  },
  {
    id: 1,
    name: "Imagine Dragons",
    image: "/testImages/imagineDragons.jpg",
    songList: ["Song 1", "Song 2", "Song 3"],
  },
  {
    id: 2,
    name: "AJR",
    image: "/testImages/ajr.jpg",
    songList: ["Song 1", "Song 2", "Song 3"],
  },
  {
    id: 3,
    name: "One Republic",
    image: "/testImages/oneRepublic.jpg",
    songList: ["Song 1", "Song 2", "Song 3"],
  },
  {
    id: 4,
    name: "Livingstone",
    image: "/testImages/livingston.jpg",
    songList: ["Song 1", "Song 2", "Song 3"],
  },
];

const allWidgets = [
  {
    id: 0,
    type: "songList",
    title: "Top Hits",
    privacy: "Followers",
    data: songData,
    addedToProfile: true,
  },
  {
    id: 1,
    type: "playlist",
    title: "Playlists",
    privacy: "Public",
    data: playlistData,
    addedToProfile: true,
  },
  {
    id: 2,
    type: "artistSpotlight",
    title: "Artist Spotlight",
    privacy: "Private",
    data: artistSpotlightData,
    addedToProfile: true,
  },
  {
    id: 3,
    type: "songList",
    title: "Recently Added",
    privacy: "Public",
    data: songData,
    addedToProfile: true,
  },
];

function App() {
  const [loginToken, setLoginToken] = useState(
    localStorage.getItem("loginToken")
  );
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    localStorage.setItem("loginToken", loginToken);
    // if (loginToken !== "undefined" && loginToken !== null){
    //   const getUserData = async () => {
    //     return await getUser(loginToken)
    //   }
    //   const user = getUserData()
    //   setUserData(user);
    // }
  }, [loginToken]);

  // Debugging console log useEffects
  useEffect(
    () => console.log("profileData changed", profileData),
    [profileData]
  );

  useEffect(
    () => console.log("userData changed", userData),
    [userData]
  );

  // Possible app bodies to return based off of login state
  const connectSpotifyScreen = (
    <div>
      <ConnectSpotify userData={userData} />
    </div>
  );

  const loginScreen = (
    <div className="App">
      <GreetingScreen setUserData={setUserData} setLoginToken={setLoginToken} />
    </div>
  );

  const appScreen = (
    <div className="App">
      <Profile
        allWidgets={allWidgets}
        profileData={profileData}
        setProfileData={setProfileData}
        loginToken={loginToken}
      />
      <MobileNav className="Modal" setProfileData={setProfileData} />
    </div>
  );

  const errorScreen = (
    <div className="App">
      <ErrorPage setLoginToken={setLoginToken}/>
    </div>
  )

  // console.log("LoginToken is ", loginToken);
  if (loginToken == "undefined" || loginToken == null) {
    // user not logged in
    return loginScreen;
  } else {
    if (userData == null) {
      return errorScreen;
    }
    else if (userData.spotifyAccessToken === "No Token") {
      // User logged in but spotify account isn't connected
      return connectSpotifyScreen;
    } else {
      // User logged in and connected to spotify
      return appScreen;
    }
  }
}

export default App;
