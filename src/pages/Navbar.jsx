import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../FireBase";

const Navbar = () => {
  async function signoutUser() {
    await signOut(auth);
  }
  return (
    <div className="navbar-container">
      <p className="chat-name">Appile Chat</p>
      <div className="user-info">
        <img
          src="https://images.unsplash.com/photo-1709777114364-f1d4da772786?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user-image"
          className="navbar-img"
        />
        <p>Username</p>
        <button
          onClick={signoutUser}
          className=" d-flex justify-content-center align-items-center"
        >
          <span className="button_top signout-btn">logout </span>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
