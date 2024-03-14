import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase";

export const AuthContext = createContext();

export const AuthContextProvide = ({ children }) => {
  const [user, setCurrentUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        setIsLogged(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, isLogged]);

  return (
    <AuthContext.Provider value={{ user, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
