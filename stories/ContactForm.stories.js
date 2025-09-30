import React from 'react';
import ContactForm from '../components/forms/ContactForm';
import input from "../components/forms/FormInputs";

export default {
  title: 'Forms/ContactForm',
  component: ContactForm,
  argTypes: {
    formName: { control: 'text' },
    formType: { control: 'text' },
    submitButton: { control: 'text' },
    submitButtonClass: { control: 'text' },
    inputs: { control: 'object' },
  },
};

const Template = (args) => <ContactForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  formName: 'Contact-form',
  formType: 'default-form',
  submitButton: 'Submit',
  submitButtonClass: '',
  inputs: [
    { Name: 'firstname', Label: 'First Name', Type: 'text', Required: true },
    { Name: 'email', Label: 'Email', Type: 'email', Required: true },
    { Name: 'Company', Label: 'Company', Type: 'textarea', Required: false },
    { Name: 'message', Label: 'Message', Type: 'textarea', Required: false },
  ],
};
