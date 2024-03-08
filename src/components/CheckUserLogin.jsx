import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../FireBase";
import CheckAuthentication from "../custom";

export default function CheckUserLogin() {
  const isLogged = CheckAuthentication();

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
}
