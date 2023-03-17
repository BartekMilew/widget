import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loader from "./loader";

const defaultConfig = {
  parentElementId: "wrapperLocation",
};
loader(window, defaultConfig, window.document.currentScript, (el, config) =>
  ReactDOM.render(<App {...config} />, el)
);
