import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store"; // ✅ Import default store
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
