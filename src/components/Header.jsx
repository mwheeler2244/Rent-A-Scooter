import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";

function Header() {
  const [mobile, setMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const styles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#ff8c38",
  };

  useEffect(() => {
    const logStatus = localStorage.getItem("loggedIn");
    setIsLoggedIn(logStatus === "true");
  }, []);

  function handleMobile() {
    setMobile((prev) => !prev);
  }
  function closeMobileNav() {
    setMobile(false);
  }

  function fakeLogOut() {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    setMobile(false);
    navigate("/");
  }

  return (
    <header>
      <i onClick={handleMobile} className={"mobile-open fa fa-bars"}></i>

      <nav className={mobile ? "navBar active" : "navBar"}>
        <i onClick={handleMobile} className={"mobile-close fa fa-times"}></i>
        <div className="nav-links">
          <NavLink
            onClick={closeMobileNav}
            style={(obj) => (obj.isActive ? styles : null)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={closeMobileNav}
            style={(obj) => (obj.isActive ? styles : null)}
            to="/host"
          >
            Host
          </NavLink>
          <NavLink
            onClick={closeMobileNav}
            style={(obj) => (obj.isActive ? styles : null)}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={closeMobileNav}
            style={(obj) => (obj.isActive ? styles : null)}
            to="/rvs"
          >
            Scooters
          </NavLink>
          <NavLink
            onClick={closeMobileNav}
            style={(obj) => (obj.isActive ? styles : null)}
            to="/login"
          >
            Login
          </NavLink>
        </div>
        <button className="logout-button" onClick={fakeLogOut}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
