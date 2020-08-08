import React from 'react';
import { Picker } from '@react-native-community/picker';

import SelectProps from '../../contracts/SelectProps';

const Select: React.FC<SelectProps> = ({ items, ...attributes }) => {
  return (
    <Picker {...attributes}>
      <Picker.Item value="" label="Selecione uma opção" />
      {items.map(({ value, label }) => (
        <Picker.Item key={value} value={value} label={label} />
      ))}
    </Picker>
  );
};

export default Select;
