import React, { useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useAuth } from '../Helper/AuthProvider';
import * as Constants from '../constants';
import LoginPage from './LoginPage';
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const toggleNavbar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">{Constants.APP_NAME}</NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          {isAuthenticated ? (
            <>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/addtask">Add Task</NavLink>
              </NavItem>
            </>) : (
            <>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/registration">Register</NavLink>
              </NavItem>
            </>)
          }
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          {isAuthenticated ? (
            <NavItem>
              <NavLink onClick={(e) => { logout();navigate('/login')} }>Logout</NavLink>
            </NavItem>) : <></>
          }
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavigationBar;
