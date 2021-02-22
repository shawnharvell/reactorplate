import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require, import/no-extraneous-dependencies
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App userName="Shawn" lang="TypeScript" />, document.querySelector("#app-mountpoint"));
