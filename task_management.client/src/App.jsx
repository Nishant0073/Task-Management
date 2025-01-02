import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import AboutPage from "./components/AboutPage";
import EditTaskPage  from './components/EditTaskPage';
import RegistrationPage from './components/RegistrationPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/edittask' element={<EditTaskPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
