import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null, // Store user info
  login: false, // Store token
  userEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.login = true;
    },
    logout: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.login = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
