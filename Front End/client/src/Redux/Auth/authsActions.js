

import {
  login,
  loginFailed,
  updatePasswordSuccess,
  updatePasswordFailure,
  resetPasswordUpdateState,
} from "./authsSlice";
// import api from "../routes";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../../firebaseConfig"; // Firebase config to be added later ttt

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";


const authRequest = async (url, data, method = "POST") => {
  try {
    return await axios({
      method,
      url,
      data,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};



export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await authRequest("api", credentials);
    const { token, user, role } = res.data;

    const decodedToken = jwtDecode(token);
    const expTime = decodedToken.exp * 1000;

    dispatch({ type: LOGIN_SUCCESS, payload: { user, token, role } });

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("tokenExpiry", expTime);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error?.response?.data?.message || "Login failed. Please try again!",
    });
  }
};


export const checkAuthToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const expiry = Number(localStorage.getItem("tokenExpiry"));

  if (!token || !expiry || Date.now() > expiry) {
    dispatch(logoutUser());
  }
};


export const loginWithGoogle = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    const token = await user.getIdToken();

    dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
    localStorage.setItem("token", token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message || "Google authentication failed.",
    });
  }
};


export const updatePassword = (newPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordUpdateState());
    const res = await api.updatePassword(newPassword);

    dispatch(updatePasswordSuccess({ message: res.data.message }));
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    console.error("Password update failed:", error);
    dispatch(
      updatePasswordFailure(
        error?.response?.data?.message ||
          "An error occurred while updating the password. Please try again."
      )
    );
  }
};


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("tokenExpiry");

  dispatch({ type: LOGOUT });
};
