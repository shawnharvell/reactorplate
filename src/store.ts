import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { StoreEnhancer } from "@reduxjs/toolkit";

import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import article from "./reducers/article";
import articleList from "./reducers/article-list";
import common from "./reducers/common";
import editor from "./reducers/editor";
import home from "./reducers/home";

const getMiddleware = (): StoreEnhancer<{ dispatch: unknown }, unknown> =>
  process.env.NODE_ENV === "production"
    ? applyMiddleware(promiseMiddleware, localStorageMiddleware)
    : // Enable additional logging in non-production environments.
      applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger());

export const store = createStore(
  combineReducers({
    article,
    articleList,
    common,
    editor,
    home,
  }),
  composeWithDevTools(getMiddleware())
);
