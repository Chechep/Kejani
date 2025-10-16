// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegisterTenant from "./pages/RegisterTenant";
import DashboardTenant from "./pages/DashboardTenant";
import DashboardLandlord from "./pages/DashboardLandlord";
import DashboardAgent from "./pages/DashboardAgent";
import ProtectedRoute from "./routes/ProtectedRoute";
import Notifications from "./pages/Notifications";
import TenantOnboarding from './pages/TenantOnboarding';

const App = () => {
  return (
    <Router>
      {/* Full-screen flex column layout */}
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        <Navbar />

        {/* Main content grows to fill space between Navbar and Footer */}
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<RegisterTenant />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/tenant-onboarding" element={<TenantOnboarding />} />

            {/* Protected routes */}
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
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;