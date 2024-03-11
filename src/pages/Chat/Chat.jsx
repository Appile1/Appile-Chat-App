import React from "react";
import "../Chat/Chat.css";
import Sidebar from "../sidebar";
import ChatPage from "../ChatPage";

export default function Chat() {
  return (
    <div className="Chat-Home">
      <div className="Chat-container">
        <Sidebar />
        <ChatPage />
      </div>
    </div>
  );
}
