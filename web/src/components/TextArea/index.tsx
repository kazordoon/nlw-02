import React from 'react'

import TextAreaProps from '../../contracts/TextAreaProps';

import './styles.css';

const TextArea: React.FC<TextAreaProps> = ({ label, id, ...attributes }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...attributes}></textarea>
    </div>
  );
};

export default TextArea;
