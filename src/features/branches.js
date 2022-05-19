import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const branchesSlice = createSlice({
  name: "branches",
  initialState: { value: initialStateValue },
  reducers: {
    setBranches: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBranches } = branchesSlice.actions;

export default branchesSlice.reducer;