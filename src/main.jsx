import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvide } from "./AuthContext.jsx";
import { ChatContextProvide } from "./ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvide>
    <ChatContextProvide>
      <App />
    </ChatContextProvide>
  </AuthContextProvide>
  // </React.StrictMode>
);
