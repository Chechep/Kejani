import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import DashboardTenant from "./pages/DashboardTenant";
import DashboardLandlord from "./pages/DashboardLandlord";
import DashboardAgent from "./pages/DashboardAgent";
import Properties from "./pages/Properties";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-all duration-300">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/tenant" element={<DashboardTenant />} />
            <Route path="/dashboard/landlord" element={<DashboardLandlord />} />
            <Route path="/dashboard/agent" element={<DashboardAgent />} />
            <Route path="/properties" element={<Properties />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
