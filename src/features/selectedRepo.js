import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { value: null };

export const selectedRepoSlice = createSlice({
  name: "selectedRepo",
  initialState: { value: initialStateValue },
  reducers: {
    setSelectedRepo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedRepo } = selectedRepoSlice.actions;

export default selectedRepoSlice.reducer;