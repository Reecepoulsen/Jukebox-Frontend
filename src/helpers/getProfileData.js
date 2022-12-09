import { Timeout } from "./abortController";

export async function getProfileData(loginToken) {
  let profileData = null;
  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
        "Content-type": "application/json",
      },
      signal: Timeout(30).signal,
    })
      .then((data) => data.json())
      .then((res) => {
        profileData = res.data;
      });
  } catch (error) {
    console.log("Error getting profile data", error);
    throw new Error(error);
  }
  return profileData;
}
