import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/Layouts/HomeLayout";
import CheckUserLogin from "./components/CheckUserLogin";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./FireBase";
import CheckAuthentication from "./custom";

function App() {
  const isLogged = CheckAuthentication();

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<CheckUserLogin />}> */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<ChatPage isLogged={isLogged} />} />
          </Route>
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
