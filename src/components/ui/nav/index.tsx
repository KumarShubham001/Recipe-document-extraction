import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

import Button from '../button';

const NavBar = ({ links }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useAuth();

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  if (!username) return null;

  return (
    <nav>
      {links.map((link) => (
        <NavLink key={link.path} className={({ isActive }) => isActive ? "active" : ""} to={'/app' + link.path}>
          <Button variant="outline" className="nav-button">{link.label}</Button>
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar