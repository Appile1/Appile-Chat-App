import { createContext } from "react";
import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase";

export const AuthContext = createContext();

export const AuthContextProvide = ({ children }) => {
  const [user, setCurrentUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={user}> {children}</AuthContext.Provider>;
};
