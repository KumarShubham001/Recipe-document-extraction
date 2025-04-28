import React from 'react';
import { useLocation } from 'react-router-dom';

import Button from '../button';

const NavBar = ({links}) => {
  const location = useLocation();
    return (
        <nav>
          <div>
            {links.map((link) => (
              <Button key={link.path} style={{PointerEvent: "none"}} variant="outline" className={location.pathname === link.path ? "nav-button active" : "nav-button"}>{link.label}</Button>
            ))}
          </div>
        </nav>
    )
}

export default NavBar