import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { StoreEnhancer } from "@reduxjs/toolkit";

import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import articleList from "./reducers/article-list";
import common from "./reducers/common";
import editor from "./reducers/editor";

const getMiddleware = (): StoreEnhancer<{ dispatch: unknown }, unknown> =>
  process.env.NODE_ENV === "production"
    ? applyMiddleware(promiseMiddleware, localStorageMiddleware)
    : // Enable additional logging in non-production environments.
      applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger());

export const store = createStore(
  combineReducers({
    articleList,
    common,
    editor,
  }),
  composeWithDevTools(getMiddleware())
);
