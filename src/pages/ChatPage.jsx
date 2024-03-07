import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { db, auth } from "../FireBase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const User = auth.currentUser;
  const CollectionRef = collection(db, "ChatMessages");
  useEffect(() => {
    let unsubscribe;

    async function GetDataFromFireBase() {
      unsubscribe = onSnapshot(CollectionRef, (querySnapshot) => {
        const newsData = [];
        querySnapshot.forEach((doc) => {
          newsData.push(doc.data());
        });

        setData(newsData);
      });
    }

    GetDataFromFireBase();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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
      });
    } catch (error) {
      setText("");
      console.error(error.message);
    }
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
      </div>
    </div>
  );
}
