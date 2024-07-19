import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
  data: {
    username:"",
    token: "",
    userPoint: "",
    role: ""
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser : (state , action) => {
        state.data = action.payload
    },
    clearUser : (state) => {
      state.data = {
        username:"",
        token: "",
        userPoint: "",
        role: ""
      };
    }
  }
});

export const { addUser , clearUser } = userSlice.actions;
export default userSlice.reducer;