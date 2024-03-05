import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <div className=" d-flex justify-content-around  align-items-center ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
