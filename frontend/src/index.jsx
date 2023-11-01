import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import { FlashcardSetProvider } from "./context/FlashcardSetContext";
import ClassContextProvider from "./context/ClassContext";
import { ClassPostProvider } from "./context/ClassPostContext";

axios.defaults.baseURL = "http://localhost:8081/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FlashcardSetProvider>
        <ClassContextProvider>
          <ClassPostProvider>
            <App />
          </ClassPostProvider>
        </ClassContextProvider>
      </FlashcardSetProvider>
    </AuthProvider>
  </React.StrictMode>
);
