const getApi = (() => {
  const BASE_URL = "http://localhost:3000";

  async function register({ username, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    console.log(response)
    return responseJson;
  }

  return {
    register
  }
})();

export default getApi;
