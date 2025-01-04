import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ childern }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        setIsAuthenticated(!!token);
    }, [])

    const login = (token) => {
        localStorage.setItem("jwt_token", token);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("jwt_token");
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {childern}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);