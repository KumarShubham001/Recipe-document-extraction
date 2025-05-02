import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

import Button from '../button';

const NavBar = ({links}) => {
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
          <div>
            {links.map((link) => (
              <Button key={link.path} style={{PointerEvent: "none"}} variant="outline" className={location.pathname === '/app' + link.path ? "nav-button active" : "nav-button"}>{link.label}</Button>
            ))}
          </div>
        </nav>
    )
}

export default NavBar