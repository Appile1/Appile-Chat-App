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

  async function FindUser() {
    const q = query(collection(db, "Users"), where("Name", "==", searchValue));

    try {
      if (searchValue === "") return;

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setSearchUser(doc.data());
        console.log(doc.data());
      });
    } catch (error) {
      console.error("Error occurred while searching for user:", error);
      setError(true);
    }
    setSearchValue("");
  }

  function HandleKeyDown(e) {
    if (e.code === "Enter") FindUser();
  }
  async function handleSelect() {
    const combinedId =
      user.uid > searchUser.uid
        ? user.uid + searchUser.uid // Concatenate user IDs
        : searchUser.uid + user.uid;

    // Fetch document from Firestore under "chats" collection with combinedId
    const res = await getDoc(doc(db, "chats", combinedId));

    // If document doesn't exist
    if (!res.exists()) {
      // Create new chat room document with empty messages array
      await setDoc(doc(db, "chats", combinedId), {
        messages: [],
      });

      // Update document in "userChats" collection for searchUser
      await updateDoc(doc(db, "userChats", searchUser.uid), {
        [combinedId + ".userInfo"]: {
          // Create or update userInfo field
          uid: user.uid, // User ID
          displayName: user.displayName, // User's display name
          PhotoURL: user.PhotoURL, // User's photo URL
        },
        [combinedId + ".date"]: serverTimestamp(), // Create or update date field with server timestamp
      });

      // Update document in "userChats" collection for user
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          // Create or update userInfo field
          uid: searchUser.uid, // User ID
          displayName: searchUser.displayName, // User's display name
          PhotoURL: searchUser.PhotoURL, // User's photo URL
        },
        [combinedId + ".date"]: serverTimestamp(), // Create or update date field with server timestamp
      });
      console.log("Done");
    }
  }

  const ErrorText = error ? "Something Went Wrong" : "Search...";
  return (
    <>
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

      {searchUser && (
        <div className="User" onClick={handleSelect}>
          <img src={searchUser.photoURL} className="SidebarUser-img" />
          <div className="NameMessage">
            <h3 className="SidebarUser-UserName">{searchUser.Name}</h3>
          </div>
        </div>
      )}
    </>
  );
}
