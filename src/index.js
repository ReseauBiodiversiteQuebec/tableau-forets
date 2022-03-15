import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/external/common.css";
import i18n from "./i18n";
import { TranslateWrapper } from "./context/TranslateWrapper";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <TranslateWrapper i18n={i18n}>
      <App />
    </TranslateWrapper>
  </React.StrictMode>,
  rootElement,
);
