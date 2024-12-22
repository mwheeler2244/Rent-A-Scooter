import React from "react";
import { NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

function Header() {
  const styles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "purple",
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedIn");
  }
  return (
    <header>
      <nav>
        <NavLink style={(obj) => (obj.isActive ? styles : null)} to="/">
          Home
        </NavLink>{" "}
        <br />
        <NavLink style={(obj) => (obj.isActive ? styles : null)} to="/host">
          Host
        </NavLink>{" "}
        <br />
        <NavLink style={(obj) => (obj.isActive ? styles : null)} to="/about">
          About
        </NavLink>
        <NavLink style={(obj) => (obj.isActive ? styles : null)} to="/rvs">
          RVs
        </NavLink>
        <NavLink style={(obj) => (obj.isActive ? styles : null)} to="/login">
          <i className="fa fa-sign-in"></i> Login
        </NavLink>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  );
}

export default Header;
