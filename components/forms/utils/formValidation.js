import { isValidEmail } from '../../../helpers/utilities';

export const containsNumber = (str) => /\d/.test(str);

export const validateFormFields = (formData, formDatas) => {
  const fieldErrors = [];

  formData?.Inputs?.forEach((field) => {
    const value = formDatas[field.Name] || '';

    if (field.Required) {
      validateRequiredField(field, value, fieldErrors);
    }

    if ((field.Label === 'Name' || field.Label === 'Full Name') && containsNumber(value)) {
      fieldErrors.push(`Please enter valid ${field.Label.toLowerCase()} using only letters.`);
    }

    if (field.Type === 'email' && !isValidEmail(value)) {
      fieldErrors.push(`Please enter a valid ${field.Label.toLowerCase()}`);
    }
  });

  return fieldErrors;
};

const validateRequiredField = (field, value, fieldErrors) => {
  if (field.Type !== 'file' && value.trim() === '') {
    fieldErrors.push(`Please enter your ${field.Label.toLowerCase()}`);
  } else if (field.Type === 'file') {
    validateFileField(field, value, fieldErrors);
  }
};

const validateFileField = (field, value, fieldErrors) => {
  if (value && value.type !== 'application/pdf') {
    fieldErrors.push(`Please upload a PDF for ${field.Label.toLowerCase()}`);
  } else if (value && value.size > 4194304) {
    fieldErrors.push(`File size exceeds the maximum limit of 4MB for ${field.Label.toLowerCase()}`);
  } else if (!value) {
    fieldErrors.push(`Please upload a file for ${field.Label.toLowerCase()}`);
  }
};
