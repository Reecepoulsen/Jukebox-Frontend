const getSpotifyToken = async (spotifyCode, loginToken, setConnectedSpotify) => {
  const body = {
    grant_type: "authorization_code",
    code: spotifyCode,
    redirect_uri: "http://localhost:3000",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  };

  const encodeFormData = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: encodeFormData(body),
  })
    .then((response) => response.json())
    .then(async (spotifyData) => {
      await fetch("http://localhost:8080/auth/authorizeSpotify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(spotifyData),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status === 200) {
            setConnectedSpotify(true);
          }
        });
    });
};

export default getSpotifyToken;