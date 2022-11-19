export async function getProfileData(loginToken) {
  let profileData = null;
  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("response from call to /profile", res)
        profileData = res.data;
      });
  } catch (error) {
    console.log("Error getting profile data", error);
    throw new Error(error);
  }
  return profileData;
}