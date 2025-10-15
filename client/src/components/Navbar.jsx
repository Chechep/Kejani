import { useState } from "react";
import { Home, Info, Menu, X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full shadow-md bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 relative">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          🏠 Kejani
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-1 hover:underline text-black dark:text-white">
            <Home size={18} /> Home
          </Link>

          <Link to="/about" className="flex items-center gap-1 hover:underline text-black dark:text-white">
            <Info size={18} /> About
          </Link>

          <Link to="/login" className="flex items-center gap-1 hover:underline text-black dark:text-white">
            <LogIn size={18} /> Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-black dark:text-white"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-6 py-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-black dark:text-white">
            <Home size={18} /> Home
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-black dark:text-white">
            <Info size={18} /> About
          </Link>

          <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-black dark:text-white">
            <LogIn size={18} /> Login
          </Link>
        </div>
      )}

      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
