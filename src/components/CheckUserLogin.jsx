import React, { useContext } from "react";

import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../AuthContext";

export default function CheckUserLogin() {
  const { user, isLogged } = useContext(AuthContext);

  return true ? <Outlet /> : <Navigate to="/login" />;
}
