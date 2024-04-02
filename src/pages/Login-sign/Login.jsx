import React, { useContext, useState, useEffect } from "react";
import { GoggleProvider, auth } from "../../FireBase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { AuthContext } from "../../AuthContext";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  async function Logout() {
    await signOut(auth);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const SigninWithEmail = async () => {
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password);

    navigate("/");
  };

  const SignGoogle = async () => {
    await signInWithPopup(auth, GoggleProvider);
    navigate("/");
  };

  return (
    <div className="login-container bg-light d-flex flex-column align-items-center justify-content-center    rounded">
      {user ? (
        <h2>
          Welcome, {user.displayName || user.email}!
          <button className="btn btn-danger" onClick={Logout}>
            Logout
          </button>
        </h2>
      ) : (
        <>
          <h2 className=" mb-4 fs-2">{"Login"}</h2>
          <form className="login-form">
            <div className="form-group">
              <label className=" fs-5 text-center">Email:</label>
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
              <label className=" fs-5">Password:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="login-buttons">
              <div className="d-flex   align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-info w-100  justify-content-between fw-bold text-white"
                  onClick={SigninWithEmail}
                >
                  Login
                </button>
                <Link to="/signup" className="link">
                  Create Account
                </Link>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
