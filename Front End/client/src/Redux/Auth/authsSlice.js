import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,
  error: null,
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
      user = null;
      token = null;
      isAuthenticated = false;
      role = null;
      error = null;
    },
    // updateProfile: (state, action) => {
    //   state.user = { ...state.user, ...action.payload };
    // },
    loginFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const { login, logout, updateProfile, loginFailed } = authSlice.actions;
export default authSlice.reducer;
