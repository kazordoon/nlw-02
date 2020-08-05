import React from 'react';

import InputProps from '../../contracts/InputProps';

import './styles.css';

const Input: React.FC<InputProps> = ({ label, id, ...attributes }) => {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...attributes} />
    </div>
  );
};

export default Input;
