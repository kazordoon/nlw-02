import React from 'react';

import SelectProps from '../../contracts/SelectProps';

import './styles.css';

const Select: React.FC<SelectProps> = ({ label, id, options, ...attributes }) => {
  return (
    <div className="select-block">
      <label htmlFor={id}>{label}</label>
      <select id={id} {...attributes} defaultValue="default">
        <option disabled hidden value="default">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
