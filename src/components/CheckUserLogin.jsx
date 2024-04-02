import React, { useContext } from "react";

import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../AuthContext";
import Login from "../pages/Login-sign/Login";

export default function CheckUserLogin({ user }) {
  // const { user } = useContext(AuthContext);
  console.log(user);
  return user ? <Outlet /> : <Login />;
}
