import React, { ChangeEvent } from 'react';
import './index.css';

interface InputProps {
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | boolean;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = 'text',
  name,
  placeholder,
  value,
  label,
  onChange,
  id,
}) => {
  return (
    <>
      {!label && <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        className="global-input"
      />}

      {label && <>
        <div className='form-input'>
          <label htmlFor={name}>{label}
          </label>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={id}
            className="global-input"
          />
        </div>
      </>}
    </>
  );
};

export default Input;