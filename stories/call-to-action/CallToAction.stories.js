import CallToAction from "../../components/call-to-actions/CallToAction";

export default {
  title: "Sections/CallToAction",
  component: CallToAction,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    heading: { control: "text" },
    description: { control: "text" },
    titleColor: { control: "color" },
    descriptionColor: { control: "color" },
    bgColor: { control: "color" },
    backgroundImage: { control: "text" },
    minHeight: { control: "number" },
    disableBgShape: { control: "boolean" },
    showTags:{control:"boolean"},
    Sectiontitle:{control:"boolean"},
  },
};

const Template = (args) => <CallToAction {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: "Let's work together",
  tags:"Have a question in mind?",
  description:
    "We collaborate with clients to build custom web solutions and headless CMS applications tailored to their unique business needs.",
  titleColor: "#000248",
  descriptionColor: "#757589",
  bgColor: "#eef0fa",
  backgroundImage: " ",
  minHeight: 300,
  buttons: { label: "Schedule a call", href: "/contact" },
  disableBgShape: false,
  showTags:true,
};

export const WithBackgroundImage = Template.bind({});
WithBackgroundImage.args = {
  backgroundImage: "https://a-us.storyblok.com/f/1016184/1440x600/9442baa8cf/background-5.png",
};

export const Minimal = Template.bind({});
Minimal.args = {
  heading: "Ready to transform your business idea?",
  tags:"Work with us",
  description: "",
  buttons: { label: "Schedule a call", href: "/subscribe" },
  bgColor: "#eef0fa",
  disableBgShape: true,
};
