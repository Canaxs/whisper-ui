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
        Cookies.set("token",state.data.token);
        Cookies.set("username",state.data.username);
        Cookies.set("userPoint",state.data.userPoint);
        Cookies.set("role",state.data.role);
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