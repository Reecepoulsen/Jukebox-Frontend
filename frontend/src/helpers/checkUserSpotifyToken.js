export async function checkUserSpotifyToken(loginToken) {
  let spotifyToken = null;
  try {
    await fetch("http://localhost:8080/auth/spotifyToken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("checkUserSpotifyToken response", res);
        spotifyToken = res.data;
      });
  } catch (error) {
    console.log("Error getting user data", error);
    throw new Error(error);
  }
  return spotifyToken;
}
