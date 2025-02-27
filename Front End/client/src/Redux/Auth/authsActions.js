// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../../firebaseConfig";
// firebase configuration to be done later 

import {
  login,
  loginFailed,
  updatePasswordSuccess,
  updatePasswordFailure,
  resetPasswordUpdateState,
} from "./authsSlice";
// import api from "../routes";
// import jwtDecode from "jwt-decode";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await api.login(credentials);
    const { token, user, role } = res.data;

    const decodeToken = jwtDecode(token);
    const expTime = decodeToken.exp * 1000;

    dispatch(login)({
      user,
      token,
      role,
    });

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("tokenExpiry", expTime);
  } catch (error) {
    console.error("Login Failed", error);

    const errorMessage =
      error?.response?.message || "Login failed, Please try again!";
    dispatch(loginFailed(errorMessage));
  }
};

export const checkAuthToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (!token || Date.now() > expiry) {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
  }
};

export const updatePassword = (newPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordUpdateState());
    const res = await api.updatePassword(newPassword);

    dispatch(
      updatePasswordSuccess({
        message: res.data.message,
      })
    );
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    console.error("password update failed", error);

    if (error?.response && error?.response?.data) {
      dispatch(
        updatePasswordFailure(
          error.response.data.message ||
            "password update failed, Please try again"
        )
      );
    } else {
      dispatch(
        updatePasswordFailure(
          "An unexpected error occurred while updating the password. Please try again"
        )
      );
    }
  }
};
