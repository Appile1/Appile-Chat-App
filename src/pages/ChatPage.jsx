import React, { useContext, useEffect, useId, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { db, auth } from "../FireBase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import ChatNavbar from "./ChatNav";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";
import { v4 as uuid } from "uuid";
//  classNames to add if message owner owner in message container and .message-owner in message-body
export default function ChatPage() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  console.log(data);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "chats", data.chatId),
      (querySnapshot) => {
        querySnapshot.exists() && setMessages(querySnapshot.data().messages);
      }
    );

    return () => unsubscribe();
  }, [data.chatId]);

  async function sendDataToFirebase() {
    try {
      if (text === "") return;
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.userInfo.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      setText("");
      console.error(error.message);
    }
    setText("");
  }

  async function DeleteDoc(id) {
    await deleteDoc(doc(db, "ChatMessages", id));
  }

  function HandleKeyDown(e) {
    e.code === "Enter" && sendDataToFirebase();
  }
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const Data = messages.map((message) => (
    <div
      ref={ref}
      key={message.id}
      className={`message-container ${
        message.senderId === user.uid ? "owner" : ""
      }`}
    >
      <img
        src={
          message.senderId === user.uid
            ? user?.photoURL
            : data.userInfo?.photoURL
        }
        // alt={message.userName}
        className="user-image"
      />
      <div className="message-content">
        <div className="message-header">
          <span className="user-name">{message.userName}</span>
          <span className="message-time">
            {/* <button onClick={() => DeleteDoc(message.id)}>
              <FaTrash />
            </button> */}
          </span>
        </div>

        <div
          className={`message-body ${
            message.senderId === user.uid ? "message-owner" : ""
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="ChatPage-container">
      <ChatNavbar />
      <div className="ChatPage-messages">{Data}</div>
      <div className="ChatPage-input d-flex  align-items-center ">
        <input
          placeholder="Type Here"
          className="text-input text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={HandleKeyDown}
        />
        <button onClick={sendDataToFirebase} className="send-button">
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}
