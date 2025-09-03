import { Rule } from 'antd/es/form';

export const createValidationRules = {
  required: (message?: string): Rule => ({
    required: true,
    message: message || 'This field is required',
  }),

  email: (message?: string): Rule => ({
    type: 'email',
    message: message || 'Please enter a valid email address',
  }),

  minLength: (min: number, message?: string): Rule => ({
    min,
    message: message || `Minimum length is ${min} characters`,
  }),

  maxLength: (max: number, message?: string): Rule => ({
    max,
    message: message || `Maximum length is ${max} characters`,
  }),

  pattern: (pattern: RegExp, message?: string): Rule => ({
    pattern,
    message: message || 'Invalid format',
  }),

  number: (message?: string): Rule => ({
    type: 'number',
    message: message || 'Please enter a valid number',
  }),

  url: (message?: string): Rule => ({
    type: 'url',
    message: message || 'Please enter a valid URL',
  }),

  date: (message?: string): Rule => ({
    type: 'date',
    message: message || 'Please select a valid date',
  }),

  custom: (validator: (rule: Rule, value: unknown) => Promise<void>, message?: string): Rule => ({
    validator,
    message,
  }),
};

export default createValidationRules;
