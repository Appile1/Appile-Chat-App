// ChatNavbar.js

import React from "react";
import {
  AiOutlineCamera,
  AiOutlinePhone,
  AiOutlineEllipsis,
} from "react-icons/ai";
import "./ChatNavbar.css";

const ChatNavbar = () => {
  return (
    <div className="chat-navbar-container">
      <p className="username">UserName</p>
      <div className="icons-container">
        <h1 className="camera-icon">
          <AiOutlineCamera />
        </h1>
        <h1 className="call-icon">
          <AiOutlinePhone />
        </h1>
        <h1 className="ellipsis-icon">
          <AiOutlineEllipsis />
        </h1>
      </div>
    </div>
  );
};

export default ChatNavbar;
