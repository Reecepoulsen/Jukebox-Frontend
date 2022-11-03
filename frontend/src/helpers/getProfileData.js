export async function getProfileData(loginToken) {
  let profileData = null;
  console.log("Getting profile data");
  try {
    await fetch("http://localhost:8080/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("Get profile response", res);
        profileData = res.data;
        // setProfileData(res.data)
      });
  } catch (error) {
    console.log("Error getting profile data", error);
    throw new Error(error);
  }
  return profileData;
}
