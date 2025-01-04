import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({childern }) =>{
    const {isAuthenticated}  = useAuth();
    return isAuthenticated ?  childern : <Navigate to="/login"/>
}


export const PublicRoute = ({childern}) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? childern : <Navigate to="/homePage"/>
}