import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLogo from "../assets/google-logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithEmail, loginAnonymously, loginWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = loginWithEmail(email, password);
      
      // Small delay to show loading state
      setTimeout(() => {
        setIsLoading(false);
        
        // Redirect based on role
        if (user.role === "landlord") {
          navigate("/dashboard/landlord");
        } else if (user.role === "agent") {
          navigate("/dashboard/agent");
        } else {
          navigate("/dashboard/tenant");
        }
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      alert("Login failed. Please try again.");
    }
  };

  const handleAnonymousLogin = () => {
    setIsLoading(true);
    const user = loginAnonymously();
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/tenant");
    }, 500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const user = loginWithGoogle();
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/tenant");
    }, 500);
  };

  // Quick login buttons for testing
  const handleQuickLogin = (testEmail) => {
    setEmail(testEmail);
    setPassword("password"); // dummy password
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-black transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-500 dark:text-gray-400 mb-6">
          Welcome Back to <span className="text-black dark:text-white">KejaLink</span>
        </h2>

        {/* Quick Test Buttons - Remove in production */}
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">Quick Test Logins:</p>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => handleQuickLogin("tenant@kejani.com")}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded"
            >
              Tenant
            </button>
            <button 
              onClick={() => handleQuickLogin("agent@kejani.com")}
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
            >
              Agent
            </button>
            <button 
              onClick={() => handleQuickLogin("golfheights@house.com")}
              className="px-2 py-1 text-xs bg-purple-500 text-white rounded"
            >
              Landlord
            </button>
          </div>
        </div>

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

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-500 hover:bg-gray-800'
            } text-white`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <LogIn size={18} /> Login
              </>
            )}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 mt-4 border py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition border-gray-400 dark:border-gray-200 disabled:opacity-50"
        >
          <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
          <span className="text-black dark:text-white">
            Sign in with Google
          </span>
        </button>

        {/* Anonymous Login */}
        <button
          onClick={handleAnonymousLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 mt-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
        >
          <User size={18} /> Continue as Guest
        </button>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black dark:text-white font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;