import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const reposSlice = createSlice({
  name: "repos",
  initialState: { value: initialStateValue },
  reducers: {
    listRepos: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { listRepos } = reposSlice.actions;

export default reposSlice.reducer;