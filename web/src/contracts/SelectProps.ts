import { SelectHTMLAttributes } from 'react';

export default interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}
