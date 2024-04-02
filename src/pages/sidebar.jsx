import React from "react";
import Navbar from "../pages/Navbar";
import Searchbox from "./SearchComponents/Searchbox";
import Users from "./Users/Users.jsx";
export default function Sidebar() {
  return (
    <div className=" sidebar-container">
      <div className="">
        <Navbar />
        <Searchbox />
      </div>
      <Users />
    </div>
  );
}
