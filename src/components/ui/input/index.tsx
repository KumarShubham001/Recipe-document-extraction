import React, { ChangeEvent } from 'react';
import './index.css';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number | boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  id,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      className="global-input"
    />
  );
};

export default Input;