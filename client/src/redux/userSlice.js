import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    role: 0,
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state._id = action.payload._id;
      state.role = action.payload.role;
      state.isLogin = true;
      return state;
    },
    logout: (state) => {
      state._id = "";
      state.role = 0;
      state.isLogin = false;
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
