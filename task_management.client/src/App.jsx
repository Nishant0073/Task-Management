import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import AboutPage from "./components/AboutPage";
import EditTaskPage from './components/EditTaskPage';
import RegistrationPage from './components/RegistrationPage';

import { ProtectedRoute, PublicRoute } from './Helper/RouteGuards';

import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute> <HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path='/about' element={<PublicRoute><AboutPage /></PublicRoute>} />
        <Route path='/edittask' element={<ProtectedRoute><EditTaskPage /></ProtectedRoute>} />
        <Route path='/registration' element={<PublicRoute><RegistrationPage /></PublicRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
