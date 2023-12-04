import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";

// axios.defaults.baseURL = "http://localhost:8081/api/v1";
axios.defaults.baseURL = "http://3.25.72.64:8081/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
