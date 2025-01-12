import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

var token = localStorage.getItem("jwt_token");
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  const login = (token) => {
    localStorage.setItem("jwt_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    token = null;
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
