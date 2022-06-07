import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  LOADING,
} from "../constants/authTypes";

import AuthService from "../services/auth.service";
import { getLoginUserProfile } from "../services/profile.service";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
toast.configure();
const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


export const login = (loginData) => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  dispatch({
    type: CLEAR_MESSAGE,
  });

  return AuthService.login(loginData).then(
    () => {
      getLoginUserProfile()
        .then((res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: res },
          });
          toast.success("Logged In Successfully")
          return Promise.resolve();
        })
        .catch(() => {
          dispatch({
            type: LOGIN_FAIL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: "Error getting your profile.",
          });
          return Promise.reject();
        });
    },
    (error) => {
      const message = error.response.data.apierror.message

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      toast.error(message)

      return Promise.reject();
    }
  );
};

export async function registerUser(dataToPost) {
  try {
      const url = `/auth/client/signup`;
      let response = await axios.post(`${ENDPOINT}${url}`, dataToPost);
      toast.success("Registered Successfully");
      return { success: true, data: response.data }
  } catch (err) {
      console.warn(err)
      toast.error(err?.response?.data?.apierror.message || "Registration Failed")
      return { success: false, err }
  }
}

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
