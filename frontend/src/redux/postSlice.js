import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
};

export const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
