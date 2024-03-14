import React, { useContext, useEffect, useId, useState } from "react";
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
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import ChatNavbar from "./ChatNav";
import { AuthContext } from "../AuthContext";

//  classNames to add if message owner owner in message container and .message-owner in message-body
export default function ChatPage() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const CollectionRef = collection(db, "ChatMessages");
  const Query = query(CollectionRef, orderBy("createdAt", "asc"));
  useEffect(() => {
    const unsubscribe = onSnapshot(Query, (querySnapshot) => {
      const newsData = [];
      querySnapshot.forEach((doc) => {
        newsData.push({ ...doc.data(), id: doc.id });
      });

      setData(newsData);
    });

    return () => unsubscribe();
  }, []);
  console.log(user);
  async function sendDataToFirebase() {
    try {
      if (text === "") return;

      setText("");
      await addDoc(collection(db, "ChatMessages"), {
        body: text,
        uid: user.uid,
        createdAt: serverTimestamp(),
        userName: user.displayName,
        userProfile: user.photoURL,
      });
    } catch (error) {
      setText("");
      console.error(error.message);
    }
  }

  async function DeleteDoc(id) {
    await deleteDoc(doc(db, "ChatMessages", id));
  }

  function HandleKeyDown(e) {
    e.code === "Enter" && sendDataToFirebase();
  }

  const Data = data.map((message) => (
    <div key={message.id} className="message-container">
      <img
        src={
          message.userProfile ||
          "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1710201600&semt=ais"
        }
        alt={message.userName}
        className="user-image"
      />
      <div className="message-content">
        <div className="message-header">
          <span className="user-name">{message.userName}</span>
          <span className="message-time">
            <button onClick={() => DeleteDoc(message.id)}>
              <FaTrash />
            </button>
          </span>
        </div>
        <div className="message-body">{message.body}</div>
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
