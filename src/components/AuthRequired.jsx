import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const location = useLocation();

  console.log(location);
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must be logged in", from: location.pathname }}
        replace
      />
    );
  } else {
    return <Outlet />;
  }
}
