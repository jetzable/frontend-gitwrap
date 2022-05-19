import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { value: {} };

export const currentBranchSlice = createSlice({
  name: "branch",
  initialState: { value: initialStateValue },
  reducers: {
    setCurrentBranch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentBranch } = currentBranchSlice.actions;

export default currentBranchSlice.reducer;