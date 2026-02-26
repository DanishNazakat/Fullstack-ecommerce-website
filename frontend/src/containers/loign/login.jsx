// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/auth/login";

// MUI imports
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      if (data) {
        setSnackbar({ open: true, message: "Login successful!", severity: "success" });
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setSnackbar({ open: true, message: "Login failed. Check credentials.", severity: "error" });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Something went wrong.", severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(255,255,255,0.1)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
          Login
        </Typography>
        <Typography variant="body2" textAlign="center" mb={4} color="rgba(255,255,255,0.8)">
          Enter your credentials to access your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            variant="filled"
            InputProps={{ sx: { bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1, color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#fff" } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            variant="filled"
            InputProps={{ sx: { bgcolor: "rgba(255,255,255,0.2)", borderRadius: 1, color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#fff" } }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(45deg, #FF6B6B, #FFD93D)",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { background: "linear-gradient(45deg, #FFD93D, #FF6B6B)" },
            }}
          >
            Login
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" mt={3} color="rgba(255,255,255,0.8)">
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#FFD93D", fontWeight: "bold", textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;