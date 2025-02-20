import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,
  error: null,
  passwordUpdate: {
    loading: false,
    success: false,
    message: false,
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
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.error = null;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
    },
    updatePasswordSuccess: (state, action) => {
      state.passwordUpdate.loading = false;
      state.passwordUpdate.success = true;
      state.passwordUpdate.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.passwordUpdate.loading = false;
      state.passwordUpdate.success = false;
      state.passwordUpdate.message = action.payload;
    },
    resetPasswordUpdateState: (state) => {
      state.passwordUpdate.loading = false;
      state.passwordUpdate.success = true;
      state.passwordUpdate.message = action.payload;
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
  loginFailed,
  updatePasswordFailure,
  updatePasswordSuccess,
  resetPasswordUpdateState,
} = authSlice.actions;
export default authSlice.reducer;
