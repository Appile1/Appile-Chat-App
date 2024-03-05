import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { db, auth } from "../FireBase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const User = auth.currentUser;
  const CollectionRef = collection(db, "ChatMessages");

  async function sendDataToFirebase() {
    try {
      if (!text) {
        throw new Error("Text cannot be empty");
      }

      setText("");
      await addDoc(collection(db, "ChatMessages"), {
        body: text,
        uid: User.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      setText("");
      console.error(error.message);
    }
  }
  async function GetDataFromFireBase() {
    const querySnapshot = await getDocs(CollectionRef);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  return (
    <div className="ChatPage w-75 bg-body-secondary d-flex justify-content-center align-items-end">
      <div className="d-flex justify-content-center   align-items-center">
        <textarea
          placeholder="Type Here"
          className=" text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <button onClick={sendDataToFirebase} className=" btn">
          <FaArrowRightLong />
        </button>
        <button onClick={GetDataFromFireBase} className=" btn">
          Fetch
        </button>
      </div>
    </div>
  );
}
