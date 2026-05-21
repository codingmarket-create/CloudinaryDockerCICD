import { useState } from "react";

import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";

import api from "../services/api";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
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

            const response = await api.post(
                "/auth/login",
                formData
            );

            console.log(response.data);
            toast.success("Login successful");

            setUser(response.data.user);

            navigate("/");

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <Container maxWidth="sm">

            <Box
                mt={10}
                component="form"
                onSubmit={handleSubmit}
            >

                <Typography
                    variant="h4"
                    mb={3}
                >
                    Login
                </Typography>

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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>

            </Box>

        </Container>
    );
}

export default Login;