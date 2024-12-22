import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

function HostLayout() {
  const navStyles = {
    display: "flex",
    gap: "1rem",
  };
  const linkStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "purple",
  };
  return (
    <>
      <nav className="host-nav" style={navStyles}>
        <NavLink end style={(obj) => (obj.isActive ? linkStyles : null)} to=".">
          Dashboard
        </NavLink>
        <NavLink
          style={(obj) => (obj.isActive ? linkStyles : null)}
          to="income"
        >
          Income
        </NavLink>
        <NavLink
          style={(obj) => (obj.isActive ? linkStyles : null)}
          to="hostRVs"
        >
          Host RVs
        </NavLink>
        <NavLink
          style={(obj) => (obj.isActive ? linkStyles : null)}
          to="reviews"
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default HostLayout;
