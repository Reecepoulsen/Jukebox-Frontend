import { Timeout } from "./abortController";

export async function checkUserSpotifyToken(loginToken) {
  let spotifyToken = null;
  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/spotifyToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
        "Content-type": "application/json",
      },
      signal: Timeout(15).signal,
    })
      .then((data) => data.json())
      .then((res) => {
        spotifyToken = res.data;
      });
  } catch (error) {
    console.log("Error getting user data", error);
    throw new Error(error);
  }
  return spotifyToken;
}
