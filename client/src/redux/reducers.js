import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  userArticleData: [],
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
  },
});

export const { setLoginState, setUserArticleData } = globalSlice.actions;
export default globalSlice.reducer;
