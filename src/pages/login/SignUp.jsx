import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Api";

function SignUp() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    createUser(userDetails)
      .then((user) => {
        setMessage(`Welcome, ${user.email}!`);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userEmail", user.email);
        navigate("/host", { replace: true });
      })
      .catch((err) => setError(err.message))
      .finally(() => setStatus("idle"));
  }

  return (
    <div className="login-container">
      <h1>Create a New Account</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          value={userDetails.email}
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          value={userDetails.password}
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          style={{ fontSize: "1.5rem" }}
        >
          {status === "submitting" ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignUp;
