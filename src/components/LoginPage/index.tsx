import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Button from './../ui/button'
import Input from './../ui/input'

import styles from "./style.module.css";

const LoginPage: React.FC = () => {
  const [uname, setUname] = useState<string>('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUname(event.target.value);
  };

  const { setUsername } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Logging in with username:', uname);
    setUsername(uname);
    navigate('/app/upload');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.loginCard} card`}>
        <h5 className={styles.title}>Please enter your details here:</h5>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            name="username"
            id="username"
            value={uname}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            label="Username"
          />
        </div>
        <Button disabled={!uname} className="full-width primary" onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;