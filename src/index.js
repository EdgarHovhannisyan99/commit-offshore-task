import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/index.scss";
import { Provider } from "react-redux";
import sagas from "./store/saga";
import configureStore from "./middlewares";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore();
store.runSaga(sagas);

const root = ReactDOM.createRoot(document.getElementById("root"));
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
);
