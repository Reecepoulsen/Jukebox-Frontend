export async function getUser() {
  let userData = null;
  try {
    await fetch('http://localhost:8080/profile/user/', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('loginToken')}`,
        "Content-type": "application/json"
      },
    })
    .then(data => data.json())
    .then((res) => {
      console.log("Get user response", res)
      userData = res.user
    })
  } catch (error) {
    console.log("Error getting user data", error)
    throw new Error(error)
  }
  return userData
}