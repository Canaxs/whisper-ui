import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState = {
  data: {
    username:"",
    token: "",
    point: "",
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
    },
    clearUser : (state) => {
      state.data = {
        username:"",
        token: "",
        point: "",
        role: ""
      };
    }
  }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;