import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { StoreProvider } from "easy-peasy";

import store from "./models/index";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Helmet>
        <title>BurnAfterLinking</title>
      </Helmet>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
