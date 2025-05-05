import React, { useState, useEffect } from 'react';
import './style.css';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`container ${isVisible ? 'visible' : ''}`}>
      <div className="toast">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;