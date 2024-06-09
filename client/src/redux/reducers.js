import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  userArticleData: [],
  userInfo: {},
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.login = action.payload;
    },
    setUserArticleData: (state, action) => {
      state.userArticleData = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setLoginState, setUserArticleData, setUserInfo } =
  globalSlice.actions;
export default globalSlice.reducer;
