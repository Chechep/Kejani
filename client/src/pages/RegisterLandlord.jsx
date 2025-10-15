import { useState } from "react";
import { Mail, Lock, User, Building2, Eye, EyeOff } from "lucide-react";
import googleLogo from "../assets/google-logo.svg";
import { useNavigate, Link } from "react-router-dom";

const RegisterLandlord = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    // Only allow special admin emails
    if (email.endsWith("@house.com") || email === "admin@kejani.com") {
      alert("Welcome Landlord/Agent! Redirecting to your dashboard...");
      navigate("/dashboard/landlord");
    } else {
      alert("Error: Only official landlord emails allowed (e.g. agent@house.com)");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-black p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Landlord / Agent Sign Up 🏢
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <User size={18} className="mr-2 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Property Name */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Building2 size={18} className="mr-2 text-gray-500" />
            <input
              type="text"
              name="property"
              placeholder="Property or Agency Name"
              required
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail size={18} className="mr-2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email (e.g. agent@house.com)"
              required
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Lock size={18} className="mr-2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Create Landlord Account
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <div className="h-px w-1/3 bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="h-px w-1/3 bg-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button
          className="flex items-center justify-center w-full border py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        >
          <img src={googleLogo} alt="Google" className="w-5 mr-2" />
          Sign up with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterLandlord;
