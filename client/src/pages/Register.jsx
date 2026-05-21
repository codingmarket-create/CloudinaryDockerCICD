import { useState } from "react";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

import api from "../services/api";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" mb={3}>
          Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
