import React from 'react';
import HeroWithForm from '../components/banner/HeroWithForm';
import ContactForm from '../components/forms/ContactForm';
import InputForm from "../components/forms/FormInputs";

export default {
  title: 'Sections/HeroWithForm',
  component: HeroWithForm,
  argTypes: {
    title: { control: 'text' },
    heading: { control: 'text' },
    description: { control: 'text' },
    bgColor: { control: 'color' },
    gradientStyle: { control: 'text' },
    removeExtraPadding: { control: 'boolean' },
    contactForms: { control: 'object' },
    inputs: { control: 'object' },
  },
};

const Template = (args) => <HeroWithForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Next JS Development Agency',
  heading: 'Elevate your Next.js development with our top talent',
  description: 'We build high-performance, scalable, and SEO-optimized web applications using Next.js, a modern React framework. With advanced technologies and industry expertise, we help businesses achieve rapid digital growth.',
  bgColor: '#f5f5f5',
  gradientStyle: 'theme-gradient-1',
  removeExtraPadding: false,
  buttons:[ 
    {
      label: "Book a discovery call",
      href: "#",
    },],
    contactForms: [
        {
          formTitle: 'Request callback',
          formType: 'default-form',
          submitButton: 'Submit',
          //submitButtonClass: 'btn-large',
          fields: [
            { Name: 'name', Label: 'Name', Type: 'text', Required: true },
            { Name: 'email', Label: 'Email', Type: 'email', Required: true },
            { Name: 'company', Label: 'Company', Type: 'text'},
            { Name: 'message', Label: 'Message', Type: 'text'},

          ],
        },
      ],
};
