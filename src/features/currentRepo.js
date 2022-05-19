import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { value: [] };

export const currentRepoSlice = createSlice({
  name: "currentRepo",
  initialState: { value: initialStateValue },
  reducers: {
    setCurrentRepo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentRepo } = currentRepoSlice.actions;

export default currentRepoSlice.reducer;