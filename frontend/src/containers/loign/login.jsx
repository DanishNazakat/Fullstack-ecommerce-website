// src/components/LoginForm.jsx
import React, { useState } from "react";
import { loginUser } from "../../services/auth/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("Login response:", data);

      if (data) {
        // localStorage.setItem("userToken", data.token);
        alert("Login successful");
        setEmail("");
        setPassword("");
      } else {
        alert("Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", margin: "8px 0" }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", margin: "8px 0" }}
        />
      </div>
      <button type="submit" style={{ padding: "10px 20px" }}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
