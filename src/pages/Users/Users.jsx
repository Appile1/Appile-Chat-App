import React from "react";
import "../Users/Users.css";

function User() {
  return (
    <div className="User">
      <img
        src="https://images.unsplash.com/photo-1608178398319-48f814d0750c?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="SidebarUser-img"
      />
      <div className="NameMessage">
        <h3 className="SidebarUser-UserName">UserName</h3>
        <p className="SidebarUser-LastMessage">Last Message</p>
      </div>
    </div>
  );
}
function Users() {
  return (
    <>
      <div className="div">
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
    </>
  );
}

export default Users;
