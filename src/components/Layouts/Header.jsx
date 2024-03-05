import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../FireBase";
export default function Header() {
  const UserName = auth?.currentUser?.displayName || "Friend";
  const UserImg =
    auth?.currentUser?.photoURL ||
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <img
            src={UserImg}
            alt="Logo"
            className="img-fluid profile-picture 2 w-50 rounded bg-transparent rounded-circle"
          />
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li className=" fs-4">{UserName} Chat App</li>
        </ul>

        <div className="col-md-3 text-end">
          <NavLink
            to="/login"
            type="button"
            className="btn btn-outline-primary me-2"
          >
            Login / Signup
          </NavLink>
        </div>
      </header>
    </div>
  );
}
