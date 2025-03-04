export const selectUser = (state) => state.auth.user;
export const selectisAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectloginError = (state) => state.auth.error;
export const selectPasswordUpdate = (state)=> state.auth.passwordUpdate
export const selectPasswordUpdateLoading = (state) => state.auth.passwordUpdate.loading
export const selectPasswordUpdateSuccess = (state) =>state.auth.passwordUpdate.success
export const selectPasswordUpdateMessage = (state) => state.auth.passwordUpdate.message
export const selectLoginError = (state) => state.auth.loginError;