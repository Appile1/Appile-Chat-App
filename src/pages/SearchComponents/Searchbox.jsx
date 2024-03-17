import React, { useContext, useState } from "react";
import "../SearchComponents/Searchbox.css";
import { db } from "../../FireBase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../../AuthContext";

export default function Searchbox() {
  const [searchValue, setSearchValue] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);

  async function AddUser() {
    const q = query(collection(db, "Users"), where("Name", "==", searchValue));
    const newUser = [];
    try {
      if (searchValue === "") return;

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          newUser.push(doc.data());
          console.log(doc.data());
        });
      }
      setSearchUser(newUser);
      console.log(searchUser);
      const combinedId =
        user.uid > searchUser.uid
          ? user.uid + searchUser.uid
          : searchUser.uid + user.uid;

      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: searchUser.uid,
            displayName: searchUser.displayName,
            PhotoURL: searchUser.PhotoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            PhotoURL: user.PhotoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error occurred while searching for user:", error);
      setError(true);
    } finally {
      setSearchValue("");
      setSearchUser(null);
    }
  }

  function HandleKeyDown(e) {
    if (e.code === "Enter") AddUser();
  }
  const ErrorText = error ? "Something Went Wrong" : "Search...";
  return (
    <div className="input-container">
      <input
        type="text"
        name="text"
        className="input"
        placeholder={ErrorText}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={HandleKeyDown}
      />
    </div>
  );
}
