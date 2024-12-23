import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginUser from "../Api.js";

function Login() {
  const [userSubmit, setUserSubmit] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  const location = useLocation();

  const loginMessage = location.state?.message;

  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault();
    setStatus("submitting");

    loginUser(userSubmit)
      .then((data) => {
        setMessage(data);
        localStorage.setItem("loggedIn", true);
        navigate("/", { replace: true });
        setUserSubmit({ email: "", password: "" });
      })
      .catch((error) => setError(error.message))
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserSubmit((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login-container">
      {loginMessage && <h3 style={{ color: "red" }}>{loginMessage}</h3>}
      <h1>Sing in to your account</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleForm} className="login-form">
        <input
          value={userSubmit.email}
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          value={userSubmit.password}
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button
          style={{ fontSize: "2rem" }}
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Logging in..." : "Log in "}
        </button>
      </form>
      <p>{message ? `the user : ${message.user?.email} was submitted` : ""}</p>
    </div>
  );
}

export default Login;
