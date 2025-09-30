import FormInputs from "../components/forms/FormInputs"; // adjust path if needed

export default {
  title: "Forms/FormInputs",
  component: FormInputs,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "textarea", "select", "file"],
    },
    label: { control: "text" },
    name: { control: "text" },
    required: { control: "boolean" },
    CssClass: { control: "text" },
    options: { control: "object" },
    uniqueArr: { control: "object" },
  },
};

const Template = (args) => <FormInputs {...args} />;

export const Text = Template.bind({});
Text.args = {
  type: "text",
  name: "name",
  label: "Name",
  required: true,
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  name: "email",
  label: "Email",
  required: true,
};

export const Company = Template.bind({});
Company.args = {
  type: "text",
  name: "Company",
  label: "Company",
  required: true,
};

export const Textarea = Template.bind({});
Textarea.args = {
  type: "text",
  name: "message",
  label: "Message",
  required: false,
};

// export const Select = Template.bind({});
// Select.args = {
//   type: "select",
//   name: "country",
//   label: "Country",
//   options: [
//     { Value: "USA", Default: false },
//     { Value: "India", Default: true },
//     { Value: "UK", Default: false },
//   ],
// };

// export const File = Template.bind({});
// File.args = {
//   type: "file",
//   name: "resume",
//   label: "Upload Resume",
//   required: true,
// };

// export const WithError = Template.bind({});
// WithError.args = {
//   type: "text",
//   name: "username",
//   label: "Username",
//   uniqueArr: ["username already exists"],
// };
