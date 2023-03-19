import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loader from "./loader";
const root = ReactDOM.createRoot(document.getElementById('root'));

const defaultConfig = {
  parentElementId: "wrapperLocation",
};
loader(window, defaultConfig, window.document.currentScript, (el, config) =>
root.render(
<App {...config} />, el)
);

// ReactDOM.render(<App />, document.getElementById('root'));
