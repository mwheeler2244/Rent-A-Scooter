import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
  const [newUser, setUser] = useState(null);

  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      setUser(userEmail);
    }
  }, []);

  return (
    <section className="dashboard-container">
      <h1 className="dashboard-title">Welcome to your Dashboard</h1>
      {newUser ? (
        <p className="user-email">
          You are logged in as: <span>{newUser}</span>
        </p>
      ) : (
        <p className="login-prompt">Please log in to access your dashboard.</p>
      )}
    </section>
  );
}

export default Dashboard;
