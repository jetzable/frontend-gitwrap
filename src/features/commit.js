import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

export const commitSlice = createSlice({
  name: "commit",
  initialState: { value: initialStateValue },
  reducers: {
    setCommit: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCommit } = commitSlice.actions;

export default commitSlice.reducer;