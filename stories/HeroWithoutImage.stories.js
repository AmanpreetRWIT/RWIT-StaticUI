import HeroWithoutImage from "../components/banner/HeroWithoutImage";

export default {
  title: "Sections/HeroWithoutImage",
  component: HeroWithoutImage,
  argTypes: {
    title: { control: "text" },
    titleColor: { control: "color" },
    heading: { control: "text" },
    headingColor: { control: "color" },
    description: { control: "text" },
    descriptionColor: { control: "color" },
    fontSize: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    gradientStyle: { control: "text" },
    removeExtraPadding: { control: "boolean" },
    hideScrollToBottomIcon: { control: "boolean" },
    showButtons: { control: "boolean" },
  },
};

const Template = (args) => <HeroWithoutImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Hire Top 1% Talent",
  titleColor: "#1b90dc",
  heading: "Web Development Agency in Dubai",
  headingColor: "##000248",
  description: "We help startups and growing businesses in Dubai build fast, scalable, and modern websites. From custom development to headless CMS solutions, we deliver clean code and seamless user experiences that drive growth.",
  descriptionColor: "#757589",
  fontSize: "medium",
  gradientStyle: "theme-gradient-7",
  removeExtraPadding: false,
  hideScrollToBottomIcon: false,
  showButtons: false,
  buttons: [
    { label: "Get Started", onClick: () => alert("Get Started clicked!"),if: { arg: "showButtons" }  },
    { label: "Learn More", onClick: () => alert("Learn More clicked!") ,if: { arg: "showButtons" }},
  ],
};
