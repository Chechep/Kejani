import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, UserPlus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google-logo.svg";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { registerWithEmail, loginWithGoogle, loginAnonymously } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      registerWithEmail(email, password);
      navigate("/dashboard/tenant");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    try {
      loginWithGoogle();
      navigate("/dashboard/tenant");
    } catch (error) {
      console.error("Google signup error:", error);
      alert("Google signup failed.");
    }
  };

  const handleAnonymousSignup = () => {
    try {
      loginAnonymously();
      navigate("/dashboard/tenant");
    } catch (error) {
      console.error("Anonymous signup error:", error);
      alert("Anonymous signup failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-500 dark:text-gray-500 mb-6">
          Create <span className="text-black dark:text-white">KejaLink</span> Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-1 focus:ring-black bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-1 focus:ring-black bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <UserPlus size={18} /> Sign Up
          </button>
        </form>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 mt-4 border py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
          <span className="text-black dark:text-white">Sign up with Google</span>
        </button>

        {/* Anonymous Signup */}
        <button
          onClick={handleAnonymousSignup}
          className="w-full flex items-center justify-center gap-2 mt-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <User size={18} /> Continue as Guest
        </button>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black dark:text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
