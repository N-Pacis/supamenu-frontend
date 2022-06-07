import axios from "axios";
import authHeader from "./auth-header";
import { encrypt } from '../services/crypto.js';
const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;

// get loged in user profile
export const getLoginUserProfile = (id) => {
  const url = `${ENDPOINT}/users/${id}`;
  return axios
    .get(url, {
      headers: authHeader()
    })
    .then((res) => {
      const hashedPayload = encrypt(res.data);
      sessionStorage.setItem("hash", hashedPayload);
      return res.data;
    });
};
