import React, { useContext, useState } from "react";
import { GoggleProvider, auth } from "../../FireBase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import CheckAuthentication from "../../custom";
import { db } from "../../FireBase";
import { AuthContext } from "../../AuthContext";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { user, isLogged } = useContext(AuthContext);
  console.log(isLogged);

  const navigate = useNavigate();

  // async function sendDataToFirebase() {
  //   try {
  //     await addDoc(collection(db, "Users"), {
  //       Name: loginData.name,
  //       uid: user.uid,
  //       createdAt: serverTimestamp(),
  //     });
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }
  async function Logout() {
    await signOut(auth);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const SigninWithEmail = async () => {
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password);

    navigate("/home");
  };

  const SignGoogle = async () => {
    await signInWithPopup(auth, GoggleProvider);
    navigate("/home");
  };

  return (
    <div className="login-container bg-light d-flex flex-column align-items-center justify-content-center">
      {isLogged ? (
        <h2>
          Welcome, {user.displayName || user.email}!
          <button className="btn btn-danger" onClick={Logout}>
            Logout
          </button>
        </h2>
      ) : (
        <>
          <h2>{"Login"}</h2>
          <form className="login-form">
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

            <div className="login-buttons">
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={SignGoogle}
                >
                  Sign in With Google
                </button>

                <button
                  type="button"
                  className="btn btn-info"
                  onClick={SigninWithEmail}
                >
                  Login
                </button>
                <Link to="/signup">Create Account</Link>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
