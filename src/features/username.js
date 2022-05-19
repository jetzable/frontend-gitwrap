import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = '';

export const usernameSlice = createSlice({
  name: "username",
  initialState: { value: initialStateValue },
  reducers: {
    currentUsername: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { currentUsername } = usernameSlice.actions;

export default usernameSlice.reducer;