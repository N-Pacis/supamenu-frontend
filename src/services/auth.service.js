import axios from "axios";
const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;

const login = async (data) => {
  const url = `${ENDPOINT}/auth/signin`;
  const res = await axios.post(url, data);
  if (res?.data?.token || res?.data?.data?.token) {
    sessionStorage.setItem(
      "token",
      JSON.stringify(res?.data.token ? res?.data.token : res?.data?.data.token)
    );
  }
  return res?.data;
};

const logout = () => {
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};
