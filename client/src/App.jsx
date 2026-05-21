import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import PublicRoute from "./routes/PublicRoute";

function App() {

  return (
    <div className="CI_wrapper">
      <Navbar />
      <Routes>

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route
          path="/login"
          element={<PublicRoute><Login /></PublicRoute>}
        />

        <Route
          path="/register"
          element={<PublicRoute><Register /></PublicRoute>}
        />

        <Route
          path="/upload"
          element={
            <AdminRoute>
              <Upload />
            </AdminRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;