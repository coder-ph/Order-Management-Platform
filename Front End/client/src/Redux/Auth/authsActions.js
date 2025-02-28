import {
  loginFailed,
  updatePasswordSuccess,
  updatePasswordFailure,
  resetPasswordUpdateState,
} from "./authsSlice";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";


const API_URL = import.meta.env.VITE_APP_USER_URL;

const authRequest = async (url, data, method = "POST") => {
  try {
    return await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Sends cookies automatically
    });
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// 🔹 Login User (Token is stored in HTTP-only cookies)
export const loginUser = (credentials) => async (dispatch) => {
  
  try {
    const response = await authRequest("/api/login", credentials);
    const {role} = response.data
    dispatch({ type: LOGIN_SUCCESS ,
      payload: {
        user: response.data.user, 
        token: response.data.token, 
        role: role,}});
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error?.response?.data?.message || "Login failed. Please try again!",
    });
  }
};

// 🔹 Check Auth Token (Handles Page Reloads & Auto Refresh)
export const checkAuthToken = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/refresh`, { withCredentials: true });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.data.user, 
        token: response.data.token,
        role: response.data.role,
      },
    });
  } catch (error) {
    dispatch(logoutUser());
  }
};

// 🔹 will handle after working on firebase thingy
export const loginWithGoogle = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    await axios.post(
      `${API_URL}/api/google-login`,
      { token },
      { withCredentials: true }
    );

    dispatch({ type: LOGIN_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message || "Google authentication failed.",
    });
  }
};

// 🔹 Update Password
export const updatePassword = (newPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordUpdateState());
    const res = await authRequest("/api/update-password", { newPassword });

    dispatch(updatePasswordSuccess({ message: res.data.message }));
  } catch (error) {
    dispatch(
      updatePasswordFailure(
        error?.response?.data?.message || "Password update failed."
      )
    );
  }
};

// 🔹 Logout User (Revokes Refresh Token)
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// 🔹 Axios Interceptor for Auto Token Refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      originalRequest._retry = true;
      try {
        await axios.get(`${API_URL}/api/refresh`, { withCredentials: true });
        return axios(error.config); // Retry the failed request
      } catch (refreshError) {
        dispatch(logoutUser());
      }
    }
    return Promise.reject(error);
  }
);

// Signup imppp

export const signupUser = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const response = await axios.post(`${API_URL}/api/signup`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data, // e.g., user data, success message
    });
    window.location.href = '/login'
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload:
        error.response?.data?.message || "Sign-up failed. Please try again!",
    });
  }
};