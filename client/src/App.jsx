import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegisterTenant from "./pages/RegisterTenant";
import DashboardTenant from "./pages/DashboardTenant";
import DashboardLandlord from "./pages/DashboardLandlord";
import DashboardAgent from "./pages/DashboardAgent";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<RegisterTenant />} />

        {/* Protected Routes with Role Restrictions */}
        <Route
          path="/dashboard/tenant"
          element={
            <ProtectedRoute allowedRoles={["tenant"]}>
              <DashboardTenant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/landlord"
          element={
            <ProtectedRoute allowedRoles={["landlord"]}>
              <DashboardLandlord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agent"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <DashboardAgent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
