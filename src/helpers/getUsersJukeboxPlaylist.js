export async function getUsersJukeboxPlaylist() {
  try {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/playlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    console.log("Error getting jukeboxPlaylist", error);
    throw new Error(error);
  }
}
