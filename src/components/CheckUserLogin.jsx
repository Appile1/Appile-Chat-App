import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../FireBase";

export default function CheckUserLogin() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogged(!!user);
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
  }, []);

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
}
