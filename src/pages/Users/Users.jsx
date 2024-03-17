import React, { useContext, useEffect, useState } from "react";
import "../Users/Users.css";
import { AuthContext } from "../../AuthContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../FireBase";
import { ChatContext } from "../../ChatContext";

function User({ displayName, PhotoUrl, LastMessage, onClick, ChatInfo }) {
  return (
    <div className="User" onClick={() => onClick(ChatInfo)}>
      <img src={PhotoUrl} className="SidebarUser-img" />
      <div className="NameMessage">
        <h3 className="SidebarUser-UserName">{displayName}</h3>
        <p className="SidebarUser-LastMessage">{LastMessage}</p>
      </div>
    </div>
  );
}
function Users() {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user]);

  function handleSelect(ChatInfo) {
    dispatch({ type: "CHANGE_USER", payload: ChatInfo });
  }
  return (
    <div className="div">
      {Object.entries(chats)?.map((chat) => (
        <User
          ChatInfo={chat[1].userInfo}
          onClick={handleSelect}
          key={chat[0]}
          displayName={chat[1].userInfo.displayName}
          PhotoUrl={chat[1].userInfo.PhotoUrl}
          LastMessage={chat[1].userInfo.LastMessage}
        />
      ))}
    </div>
  );
}

export default Users;
