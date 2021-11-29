import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { StoreProvider } from "easy-peasy";
import axios from "axios";

import store from "./models/index";

if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "http://localhost:5000";
}

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
