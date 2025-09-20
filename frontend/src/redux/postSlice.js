import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  selectedPost:null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSlectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setPosts,setSlectedPost } = postSlice.actions;

export default postSlice.reducer;
