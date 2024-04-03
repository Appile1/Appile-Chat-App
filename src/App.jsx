import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login-sign/Login";
import Signup from "./pages/Login-sign/Signup";

import Chat from "./pages/Chat/Chat";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import CheckUserLogin from "../src/components/CheckUserLogin";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<CheckUserLogin user={user} />} path="/">
            <Route index element={<Chat />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
