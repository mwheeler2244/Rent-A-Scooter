import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../../Api.js";

function Login() {
  const [userSubmit, setUserSubmit] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/host", { replace: true }); // Redirect after login
    }
  }, [loggedIn, navigate]); // Trigger when loggedIn changes

  function handleChange(e) {
    const { name, value } = e.target;
    setUserSubmit((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const user = await loginUser(userSubmit);
      setMessage(`Welcome back, ${user.email}`);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userEmail", user.email);
      setUserSubmit({ email: "", password: "" });
      setLoggedIn(true); // Set loggedIn state to trigger redirect
    } catch (error) {
      setError(error.message);
    } finally {
      setStatus("idle");
    }
  }

  // Google Login Handler
  async function handleGoogleLogin(e) {
    e.preventDefault();
    try {
      const user = await loginWithGoogle(); // Call the loginWithGoogle function
      setMessage(`Welcome, ${user.displayName}`);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userEmail", user.email);
      setLoggedIn(true); // Set loggedIn state to trigger redirect
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="login-form">
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
        <div className="form-buttons">
          <button
            className="login-button"
            onClick={handleLogin}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Logging in..." : "Log in"}
          </button>

          <button className="google-button" onClick={handleGoogleLogin}>
            <img src="images/googleLogo.png" alt="Google Logo" />
            Sign in with Google
          </button>

          <button className="signup-button" onClick={() => navigate("/signup")}>
            Start Hosting!
          </button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Login;
