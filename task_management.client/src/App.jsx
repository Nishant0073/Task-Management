import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import LoginPage from "./components/LoginPage";
import AboutPage from "./components/AboutPage";
import EditTaskPage from './components/EditTaskPage';
import RegistrationPage from './components/RegistrationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProtectedRoute, PublicRoute } from './Helper/RouteGuards';
import NotFoundPage from './components/NotFoundPage'
import AddTaskPagen from './components/AddTaskPage';
import NavigationBar from './components/NavigationBar';
import AddTaskPage from './components/AddTaskPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edittask"
          element={
            <ProtectedRoute>
              <EditTaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtask"
          element={
            <ProtectedRoute>
              <AddTaskPage/>
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/registration" element={<PublicRoute><RegistrationPage /></PublicRoute>} />

        {/* Unrestricted Routes */}
        <Route path="/about" element={<AboutPage />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>

  );
}

export default App;
