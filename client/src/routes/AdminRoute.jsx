import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;