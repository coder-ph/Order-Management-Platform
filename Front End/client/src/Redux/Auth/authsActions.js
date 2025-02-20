import { login, loginFailed, updatePasswordSuccess, updatePasswordFailure } from "./authsSlice";

// import {api} from '../../routes'
export const loginUser = (credentials) => async (dispatch) => {
  try {

   
    const res = await api.login(credentials);

    dispatch(login)({
      user: res.data.user,
      token: res.data.token,
      role: res.data.role,
    });

    localStorage.setItem("token", Response.data.token); 
    localStorage.setItem("role", Response.data.role);
  } catch (error) {
    console.error("Login Failed", error);

    if (error?.response && error?.response?.data) {
      dispatch(
        loginFailed(
          error.response.data.message || "Login failed, please try again"
        )
      );
    }
    else {
        dispatch(loginFailed('An unexpected error occured while logging in. Please try again'))
    }
  }
};

export const updatePassword = (newPassword) => async (dispatch) => {
  try {
    const res = await api.updatePassword(newPassword)

    dispatch(upda)
  }
}