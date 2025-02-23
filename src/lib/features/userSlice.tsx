import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
  data: {
    username:"",
    token: "",
    userPoint: "",
    role: "",
    isSubscribe: ""
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
        Cookies.set("isSubscribe",state.data.isSubscribe)
    },
    clearUser : (state) => {
      state.data = {
        username:"",
        token: "",
        userPoint: "",
        role: "",
        isSubscribe: ""
      };
    }
  }
});

export const { addUser , clearUser } = userSlice.actions;
export default userSlice.reducer;