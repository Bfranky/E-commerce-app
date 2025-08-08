// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    if (username && password) {
      // Simple demo: set role based on username
      const role = username.toLowerCase() === "admin" ? "admin" : "user";

      const loggedInUser = { name: username, role };
      setUser(loggedInUser);

      // ✅ Save to localStorage so it persists
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
