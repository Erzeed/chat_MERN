const getApi = (() => {
  const BASE_URL = "http://localhost:3000";

  async function register({ username, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      credentials: 'include',
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
    return responseJson;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    return responseJson;
  }

  async function getProfile() {
    const response = await fetch(`${BASE_URL}/profile`, {
      credentials: 'include',
    });
    const responseJson = await response.json();
    return responseJson;
  }

  return {
    register,
    getProfile,
    login
  }
})();

export default getApi;
