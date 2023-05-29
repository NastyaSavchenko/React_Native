import { createSlice } from "@reduxjs/toolkit";

const state = {
  id: null,
  nickname: null,
  email: null,
  stateChange: null,
  avatar: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      id: payload.id,
      nickname: payload.nickname,
      email: payload.email,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
