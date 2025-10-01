// HeroWithVerticalImage.stories.js
import HeroWithVerticalImage from "../components/banner/HeroWithVerticalImage";

export default {
  title: "Sections/HeroWithVerticalImage",
  component: HeroWithVerticalImage,
  argTypes: {
    title: { control: "text" },
    titleColor: { control: "color" },
    heading: { control: "text" },
    headingColor: { control: "color" },
    description: { control: "text" },
    descriptionColor: { control: "color" },
    bgColor: { control: "color" },
    gradientStyle: { control: "text" },
    imageOnTop: { control: "boolean" },
    showButtons: { control: "boolean" },
    showbannerImage: { control: "boolean" },
    textAlignment: {
        control: { type: "radio" }, 
        options: ["left", "center", "right"],
      },
  },
};

const Template = (args) => <HeroWithVerticalImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Custom Apparel eCommerce",
  titleColor: "#1b90dc",
  heading: "Project Overview",
  headingColor: "#000248",
  description:
    "Rush order Tees sought a resilient online store capable of managing the multitude of orders their business attracts. Additionally, they required a user-friendly feature enabling customers to personalize their orders.",
  descriptionColor: "#757589",
  bgColor: "#f0f0f0",
  gradientStyle: "theme-gradient-3",
  imageOnTop: false,
  showButtons: false,
  showbannerImage: false,
  buttons: { label: "Get Started", onClick: () => alert("Get Started clicked!") },
  bannerImage: {
        src: "https://a-us.storyblok.com/f/1016184/1440x967/4698c8574a/rush-order-tees-banner.png",
    alt: "Sample Banner",
    width: 1260,
    height: 500,
  },
};
