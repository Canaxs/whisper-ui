import { createSlice } from "@reduxjs/toolkit";

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
        localStorage.setItem("token",state.data.token);
        localStorage.setItem("username",state.data.username);
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