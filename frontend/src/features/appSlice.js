import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  address: JSON.parse(localStorage.getItem("addresses")) || [],
  isSeller: false,
  showUserLogin: false,
  searchOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowUserLogin: (state, action) => {
      state.showUserLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload; 
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("addresses");
      state.user = null;
      state.address = [];
      state.isSeller = false;
      state.showUserLogin = false;
    },
    setAddress: (state, action) => {
      state.address.push(action.payload);
    },
    replaceAddress: (state, action) => {
      state.address = action.payload;
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload;
    },
    // Add more app-related reducers as needed
  },
});

export const { setShowUserLogin, logout, setUser, setAddress, replaceAddress, setSearchOpen } =
  appSlice.actions;
export default appSlice.reducer;
