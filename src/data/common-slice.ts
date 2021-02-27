import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
  appLoaded: boolean;
  appName: string;
}

const initialState: CommonState = {
  appLoaded: false,
  appName: "Conduit",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAppLoaded: (state) => {
      state.appLoaded = true;
    },
    setAppUnloaded: (state) => {
      state.appLoaded = false;
    },
    setAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload;
    },
  },
});

export const { setAppLoaded, setAppUnloaded, setAppName } = commonSlice.actions;
export const { reducer: userReducer } = commonSlice;
