import { TextareaHTMLAttributes } from 'react';

export default interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}
