import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import { HashRouter } from "react-router-dom";

import App from "./components/App";
import { store } from "./store";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, import/no-extraneous-dependencies
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,

  document.querySelector("#app-mountpoint")
);
