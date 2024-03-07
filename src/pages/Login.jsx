import React, { useState, useEffect } from "react";
import { GoggleProvider, auth } from "../FireBase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import CheckAuthentication from "../custom";

export default function Login() {
  const [loginData, setLoginData] = useState({ password: "", email: "" });
  const isLogged = CheckAuthentication();

  const navigate = useNavigate();

  async function Logout() {
    await signOut(auth);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const SignGoogle = async () => {
    await signInWithPopup(auth, GoggleProvider);
    navigate("/");
  };

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );
    navigate("/");
  };

  async function SigninWithEmail() {
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
    navigate("/");
  }

  return (
    <div className="login-container bg-light d-flex flex-column align-items-center justify-content-center">
      <h2>{isLogged ? "Logged in" : "Logged out"}</h2>

      <h2>Login / Sign Up</h2>
      <form className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            className="form-control"
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
          />
        </div>
        <div className="login-buttons">
          {isLogged ? (
            <button type="button" className="btn btn-danger" onClick={Logout}>
              Logout
            </button>
          ) : (
            <div className=" d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={SignGoogle}
              >
                Sign up With Google
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={SigninWithEmail}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
