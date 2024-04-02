import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../FireBase";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  async function signoutUser() {
    await signOut(auth);
  }
  const { user } = useContext(AuthContext);

  const UserName = user.displayName;
  const userUrl =
    user.photoURL ||
    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1710201600&semt=ais";
  return (
    <div className="navbar-container">
      <p className="chat-name">Appile Chat</p>
      <div className="user-info align-items-center">
        <img src={userUrl} alt="user-image" className="navbar-img" />
        <p>{UserName}</p>
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
