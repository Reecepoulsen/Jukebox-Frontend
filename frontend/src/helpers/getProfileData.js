export async function getProfileData() {
  let profileData = null;
  try {
    await fetch("http://localhost:8080/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('loginToken')}`,
        "Content-type": "application/json"
      },
    })
    .then(data => data.json())
    .then((res) => {
      console.log("Get profile response", res)
      profileData = res.data;
      // setProfileData(res.data)
    })
  } catch (error) {
    console.log("Error getting profile data", error)
    throw new Error(error)
  }
  return profileData;
}