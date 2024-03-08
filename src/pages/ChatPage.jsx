import React, { useEffect, useId, useState } from "react";
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

export default function ChatPage() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const User = auth.currentUser;
  const CollectionRef = collection(db, "ChatMessages");
  const Query = query(CollectionRef, orderBy("createdAt", "desc"));
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
  console.log(data);
  async function sendDataToFirebase() {
    try {
      if (text === "") return;

      setText("");
      await addDoc(collection(db, "ChatMessages"), {
        body: text,
        uid: User.uid,
        createdAt: serverTimestamp(),
        userName: auth.currentUser.displayName,
        userProfile: auth.currentUser.photoURL,
      });
    } catch (error) {
      setText("");
      console.error(error.message);
    }
  }

  async function DeleteDoc(id) {
    await deleteDoc(doc(db, "ChatMessages", id));
  }

  const Data = data.map((message) => (
    <div key={message.id} className="message-container">
      <img
        src={message.userProfile}
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
      <div className="ChatPage-messages">{Data}</div>
      <div className="ChatPage-input d-flex align-items-center  justify-content-center">
        <textarea
          placeholder="Type Here"
          className="text-input text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={sendDataToFirebase} className="send-button">
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}
