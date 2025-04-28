import React, { useState } from 'react';
import './style.css';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    onChange: (value: string) => void;
    value?: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="custom-select-container">
            <button
                type="button"
                className="custom-select-button"
                onClick={toggleOpen}
            >
                {selectedOption ? selectedOption.label : 'Select an option'}
                <div
                    className={`custom-select-arrow ${isOpen ? 'custom-select-arrow-open' : ''}`}
                >
                    <svg stroke="currentColor" fill="#ffffff" strokeWidth="5" viewBox="0 0 512 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M256 32 20 464h472L256 32z"></path></svg>
                </div>
            </button>
            {isOpen && (
                <div className="custom-select-dropdown">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className="custom-select-option"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
