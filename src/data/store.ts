import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { commonSlice } from "./common-slice";
import { userSlice } from "./user-slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    common: commonSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
