import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLogo from "../assets/google-logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginWithEmail, loginAnonymously, loginWithGoogle, user } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    loginWithEmail(email, password);

    // Redirect based on mock role rules
    if (email === "golfheights@house.com") {
      navigate("/dashboard/landlord");
    } else if (email === "agent@kejani.com") {
      navigate("/dashboard/agent");
    } else {
      navigate("/dashboard/tenant");
    }
  };

  const handleAnonymousLogin = () => {
    loginAnonymously();
    navigate("/dashboard/tenant");
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
    navigate("/dashboard/tenant");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-black dark:text-white mb-6">
          Welcome Back to <span className="text-blue-600">Kejani</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
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
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <LogIn size={18} /> Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 mt-4 border py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
          <span className="text-black dark:text-white">
            Sign in with Google
          </span>
        </button>

        {/* Anonymous Login */}
        <button
          onClick={handleAnonymousLogin}
          className="w-full flex items-center justify-center gap-2 mt-4 bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <User size={18} /> Continue as Guest
        </button>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
