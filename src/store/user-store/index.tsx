import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store'

const initialState = {
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser : (state , action) => {
        state.data = action.payload
    }
  }
});

export const { addUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.data

export default userSlice.reducer