import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Types from "./types";

export interface UserState {
  currentUser: Types.User;
}

const initialState: UserState = {
  currentUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Types.User>) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = undefined;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
