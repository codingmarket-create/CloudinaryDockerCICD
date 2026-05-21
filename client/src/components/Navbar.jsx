import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out");

      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cloudinary App
        </Typography>

        <Box>
          {user && (
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          )}

          {user?.role === "admin" && (
            <Button color="inherit" component={Link} to="/upload">
              Upload
            </Button>
          )}

          {!user && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>

              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
