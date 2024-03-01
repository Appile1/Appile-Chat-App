import React, { useState } from "react";
import { GoggleProvider, auth } from "../FireBase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({ password: "", email: "" });

  async function Logout() {
    await signOut(auth);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const SignGoogle = async () => {
    await signInWithPopup(auth, GoggleProvider);
  };

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );
  };

  return (
    <div style={styles.container}>
      <h2>Login / Sign Up</h2>
      <form style={styles.form}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </label>
        <div style={styles.buttons}>
          <button type="button" onClick={SignGoogle}>
            Sign up With Google
          </button>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
          <button type="button" onClick={Logout}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
};
