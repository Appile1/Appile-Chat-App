import React, { useContext, useState, useEffect } from "react";
import { GoggleProvider, auth, storage } from "../../FireBase";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db } from "../../FireBase";
import { AuthContext } from "../../AuthContext";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Audio } from "react-loader-spinner";

export default function Signup() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function CreateUser(user) {
    try {
      await setDoc(doc(db, "Users", user.uid), {
        Name: user.displayName,
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async function CreateUserChat(user) {
    try {
      await setDoc(doc(db, "userChats", user.uid), {});
    } catch (error) {
      console.error(error.message);
    }
  }

  async function Logout() {
    await signOut(auth);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    const DisplayName = e.target[0].value;
    const file = e.target[3].files[0];

    try {
      const Res = await createUserWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      const storageRef = ref(storage, DisplayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.error("Storage Error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(Res.user, {
              displayName: DisplayName,
              photoURL: downloadURL,
            });
            CreateUser(Res.user);
            CreateUserChat(Res.user);
            navigate("/");
          });
        }
      );
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  }

  return (
    <div className="login-container bg-light d-flex flex-column align-items-center justify-content-center">
      {user ? (
        user.displayName ? (
          <h2>
            Welcome, {user.displayName}
            <button className="btn btn-danger" onClick={Logout}>
              Logout
            </button>
          </h2>
        ) : (
          <Audio
            height="85"
            width="90"
            radius="9"
            color="red"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )
      ) : (
        <>
          <h2>{"Sign Up"}</h2>
          <form className="login-form" onSubmit={HandleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={loginData.name}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Display Photo URL:</label>
              <input type="file" name="photoURL" className="form-control" />
            </div>

            <div className="login-buttons">
              <div className="d-flex justify-content-center gap-2">
                <>
                  <button type="submit" className="btn btn-secondary">
                    Sign Up
                  </button>
                </>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
