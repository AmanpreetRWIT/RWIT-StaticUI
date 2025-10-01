import BrandTwo from "../../components/brands/BrandTwo";

export default {
  title: "Sections/BrandTwo",
  component: BrandTwo,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: { control: "text" },
    titleColor: { control: "color" },
    bgColor: { control: "color" },
    sliderBgColor: { control: "color" },
    sliderSettings: { control: "object" },
  },
};

const Template = (args) => <BrandTwo {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Our Trusted Partners",
  titleColor: "#ffffff",
  bgColor: "#ffffff",
  sliderBgColor: "#000248",
  logos: [
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/07b93a7079/diller-logo.svg",
      alt: "Logo 1",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/e5be8cd0b2/hohme-logo.svg",
      alt: "Logo 2",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/167x40/49d611a60d/carbmee-light.svg",
      alt: "Logo 3",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/88ea47bab0/redsbaby-logo.svg",
      alt: "Logo 4",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/420a827f21/tilyo-logo.svg",
      alt: "Logo 1",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/300x91/5ec88d4961/meta-signals-light.svg",
      alt: "Logo 2",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/73f667ee9f/airdna-light.svg",
      alt: "Logo 4",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/1ab7825beb/medely-light.svg",
      alt: "Logo 1",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/9493d002c0/planq-light.svg",
      alt: "Logo 2",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/a51964c516/ssdnodes-light.svg",
      alt: "Logo 3",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/624ed084ca/tudepa-light.svg",
      alt: "Logo 4",
    },
  ],
  sliderSettings: {
    speed: 12000,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
  },
};

export const WithClients = Template.bind({});
WithClients.args = {
  title: "Our Clients",
  titleColor: "#ffffff",
  bgColor: "#f5f5f5",
  sliderBgColor: "#000248",
  clients: [
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/624ed084ca/tudepa-light.svg",
      alt: "Client 1",
    },
    {
      src: "https://a-us.storyblok.com/f/1016184/168x35/624ed084ca/tudepa-light.svg",
      alt: "Client 2",
    },
  ],
  sliderSettings: {
    speed: 10000,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
  },
};
