import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../FireBase";
import CheckAuthentication from "../custom";
import { AuthContext } from "../AuthContext";

export default function CheckUserLogin() {
  const User = useContext(AuthContext);

  return User ? <Outlet /> : <Navigate to="/login" />;
}
