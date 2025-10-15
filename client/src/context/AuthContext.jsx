// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fake async login simulation
  const mockLogin = (role = "tenant") => {
    const fakeUser = {
      uid: "12345",
      email:
        role === "landlord"
          ? "golfheights@house.com"
          : role === "agent"
          ? "agent@kejani.com"
          : "tenant@kejani.com",
      role,
    };
    setUser(fakeUser);
  };

  const loginWithGoogle = () => {
    mockLogin("tenant");
  };

  const loginWithEmail = (email, password) => {
    if (email === "golfheights@house.com") {
      mockLogin("landlord");
    } else if (email === "agent@kejani.com") {
      mockLogin("agent");
    } else {
      mockLogin("tenant");
    }
  };

  const registerWithEmail = (email, password) => {
    setUser({ email, role: "tenant" });
  };

  const loginAnonymously = () => {
    mockLogin("tenant");
  };

  const logout = () => setUser(null);

  useEffect(() => {
    // simulate "loading complete"
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        loginAnonymously,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ For all pages that use authentication
export const useAuth = () => useContext(AuthContext);
