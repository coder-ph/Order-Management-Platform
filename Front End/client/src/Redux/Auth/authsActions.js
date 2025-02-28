import {
  loginFailed,
  updatePasswordSuccess,
  updatePasswordFailure,
  resetPasswordUpdateState,
} from "./authsSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

const API_URL = import.meta.env.REACT_APP_USER_URL;

const authRequest = async (url, data, method = "POST") => {
  try {
    return await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Login User
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await authRequest("/auth/login", credentials);
    const { token } = res.data;

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);

    const expTime = decodedToken.exp * 1000;

    dispatch({ type: LOGIN_SUCCESS, payload: { role: decodedToken.role } });

    localStorage.setItem("token", token); // Store token
    localStorage.setItem("tokenExpiry", expTime);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error?.response?.data?.message || "Login failed. Please try again!",
    });
  }
};

// Check Auth Token (For Page Reloads)
export const checkAuthToken = () => async (dispatch) => {
  const expiry = Number(localStorage.getItem("tokenExpiry"));
  const token = localStorage.getItem("token");

  if (!token || !expiry || Date.now() > expiry) {
    dispatch(logoutUser());
    return;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token on Reload:", decodedToken);

    dispatch({ type: LOGIN_SUCCESS, payload: { role: decodedToken.role } });
  } catch (error) {
    dispatch(logoutUser());
  }
};

// Google Authentication
export const loginWithGoogle = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const res = await axios.post(
      `${API_URL}/auth/google-login`,
      { token },
      { withCredentials: true }
    );

    const { token: serverToken } = res.data;
    const decodedToken = jwtDecode(serverToken);

    console.log("Decoded Google Token:", decodedToken);

    const expTime = decodedToken.exp * 1000;

    dispatch({ type: LOGIN_SUCCESS, payload: { role: decodedToken.role } });

    localStorage.setItem("token", serverToken);
    localStorage.setItem("tokenExpiry", expTime);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message || "Google authentication failed.",
    });
  }
};

// Update Password
export const updatePassword = (newPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordUpdateState());
    const res = await authRequest("/auth/update-password", { newPassword });

    dispatch(updatePasswordSuccess({ message: res.data.message }));
  } catch (error) {
    dispatch(
      updatePasswordFailure(
        error?.response?.data?.message || "Password update failed."
      )
    );
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });

    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");

    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
