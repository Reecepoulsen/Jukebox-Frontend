const getSpotifyToken = async (spotifyCode, loginToken) => {
  const body = {
    grant_type: "authorization_code",
    code: spotifyCode,
    redirect_uri: "http://localhost:3000",
    client_id: "1bdca04f2bf24fc0a5860fb2f06388d1",
    client_secret: "430bae3e7c9646e58dc5b33f1d0bc34a",
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
      console.log("---------", spotifyData);
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
          console.log("Response from auth/authorizeSpotify", res);
        });
    });
};

export default getSpotifyToken;