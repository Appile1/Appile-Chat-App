import React, { useContext } from "react";
import {
  AiOutlineCamera,
  AiOutlinePhone,
  AiOutlineEllipsis,
} from "react-icons/ai";
import "./ChatNavbar.css";
import { ChatContext } from "../ChatContext";
const ChatNavbar = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat-navbar-container">
      <p className="username">{data?.userInfo?.displayName}</p>
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
