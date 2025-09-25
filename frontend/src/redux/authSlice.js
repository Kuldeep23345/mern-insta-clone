import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  suggestedUser: [],
  userProfile: null,
  selectedUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUser: (state, action) => {
      state.suggestedUser = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setSuggestedUser,
  setUserProfile,
  setSelectedUser,
} = authSlice.actions;

export default authSlice.reducer;
