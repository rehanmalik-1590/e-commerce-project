import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Get from session or cookies
const getUserInfo = () => {
  try {
    const sessionData = sessionStorage.getItem("userInfo");
    if (sessionData) return JSON.parse(sessionData);

    const cookieData = Cookies.get("userInfo");
    return cookieData ? JSON.parse(cookieData) : null;
  } catch (error) {
    console.error("Auth get error:", error);
    return null;
  }
};

const initialState = {
  userInfo: getUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      try {
        const userStr = JSON.stringify(action.payload);
        sessionStorage.setItem("userInfo", userStr);
        Cookies.set("userInfo", userStr, { expires: 1 }); // 1 day
      } catch (error) {
        console.error("Auth save error:", error);
      }
    },

    logout: (state) => {
      state.userInfo = null;
      sessionStorage.removeItem("userInfo");
      Cookies.remove("userInfo");
    },

    checkAuth: (state) => {
      state.userInfo = getUserInfo();
    },
  },
});

export const { setCredentials, logout, checkAuth } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectIsAuthenticated = (state) => !!state.auth.userInfo;
export default authSlice.reducer;
