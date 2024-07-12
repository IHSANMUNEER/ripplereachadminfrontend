import React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import { AuthProvider } from "auth";
import App from "./App";

import "./index.css";

const ripple = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(ripple.dispatch);


createRoot(document.getElementById("root")).render(
  <Provider store={ripple}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>

);
