import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_SUCCESS, LOGOUT } from "./authsActions"; // Import action types

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  role: localStorage.getItem("role") || null,
  error: null,
  passwordUpdate: {
    loading: false,
    success: false,
    message: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.error = null;
      localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("tokenExpiry");
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
    },
    updatePasswordSuccess: (state, action) => {
      state.passwordUpdate.loading = false;
      state.passwordUpdate.success = true;
      state.passwordUpdate.message = action.payload.message;
    },
    updatePasswordFailure: (state, action) => {
      state.passwordUpdate.loading = false;
      state.passwordUpdate.success = false;
      state.passwordUpdate.message = action.payload;
    },
    resetPasswordUpdateState: (state) => {
      state.passwordUpdate = {
        loading: false,
        success: false,
        message: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LOGIN_SUCCESS, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.error = null;
      localStorage.setItem("role", action.payload.role);
    });
    builder.addCase(LOGOUT, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("tokenExpiry");
    });
  },
});

export const {
  login,
  logout,
  loginFailed,
  updatePasswordFailure,
  updatePasswordSuccess,
  resetPasswordUpdateState,
} = authSlice.actions;

export default authSlice.reducer;
