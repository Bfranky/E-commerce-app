// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (username, password) => {
    // Mock credentials
    if (
      (username === "admin" && password === "admin123") ||
      (username === "user" && password === "user123")
    ) {
      const loggedUser = { username };
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/"); // Redirect to home
    } else {
      alert("Invalid credentials. Try again.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
