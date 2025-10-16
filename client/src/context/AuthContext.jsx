// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with true to check auth state

  // Check for existing user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('kejani_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('kejani_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kejani_user');
    }
  }, [user]);

  const mockLogin = (role = "tenant", email) => {
    const fakeUser = {
      uid: "12345",
      email: email || (
        role === "landlord"
          ? "golfheights@house.com"
          : role === "agent"
          ? "agent@kejani.com"
          : "tenant@kejani.com"
      ),
      role,
      name: role === "landlord" ? "Property Owner" : 
            role === "agent" ? "Real Estate Agent" : "Tenant User"
    };
    setUser(fakeUser);
    return fakeUser;
  };

  const loginWithGoogle = () => {
    const user = mockLogin("tenant", "googleuser@example.com");
    return user;
  };

  const loginWithEmail = (email, password) => {
    let role = "tenant";
    if (email === "golfheights@house.com") {
      role = "landlord";
    } else if (email === "agent@kejani.com") {
      role = "agent";
    }
    const user = mockLogin(role, email);
    return user;
  };

  const registerWithEmail = (email, password) => {
    const user = { 
      email, 
      role: "tenant",
      uid: Date.now().toString(),
      name: "New Tenant"
    };
    setUser(user);
    return user;
  };

  const loginAnonymously = () => {
    const user = mockLogin("tenant", "guest@kejani.com");
    return user;
  };

  const logout = () => {
    setUser(null);
  };

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
      {children}
    </AuthContext.Provider>
  );
};

// ✅ For all pages that use authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};