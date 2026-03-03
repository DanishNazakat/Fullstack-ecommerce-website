// src/components/LoginForm.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/auth/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });
      console.log("user data" , data)
      if (data.user.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.log("Login failed", error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Login</button>
        </div>
      </form>

      <p style={{ marginTop: "10px" }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;