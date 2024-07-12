import React, { useState } from "react";
import { Button, TextField, Typography, Avatar, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../../auth"; // Import useAuth hook
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests
import { toast } from "react-toastify"; // Import toast notification

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://apiripple-production.up.railway.app/posease/login', { email, password });

      if (response.status === 200) {
        login({ email });
        navigate("/blogs");
        toast.success("Login successful!"); // Show success message
      } else {
        toast.error("Incorrect email or password. Please try again."); // Show error message
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please try again."); // Show error message
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #e0e0e0',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#1E1E1E', // Adjusted to the desired color
          color: '#ffffff', // Text color for better contrast
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: { color: '#ffffff' } // Text color for input field
            }}
            InputLabelProps={{
              sx: { color: '#ffffff' } // Label color for input field
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: { color: '#ffffff' } // Text color for input field
            }}
            InputLabelProps={{
              sx: { color: '#ffffff' } // Label color for input field
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', color: '#ffffff' }} // Adjusted button color
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
