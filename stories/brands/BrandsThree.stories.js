import BrandsThree from "../../components/brands/BrandThree";

export default {
  title: "Sections/BrandsThree",
  component: BrandsThree,
  parameters: {
    layout: "fullscreen",
  },
  sectionTitle: {control: "object"},
};

const Template = (args) => <BrandsThree {...args} />;

export const Default = Template.bind({});
Default.args = {
  bgColor: "#ffffff",
  revertColumn: false,
  title: "Helping clients since 2012",
  subtitle: "Our Clients",
  description: "RW Infotech is a founder-led digital agency, originally established in India. Over the years, we’ve expanded our operations across Dubai, the USA, and Australia. Today, our primary operations are based in Dubai UAE, serving clients across the globe with innovative, scalable solutions.",
  titleColor: "#000248",
  descriptionColor: "#757589",
  logos: [
    { src: "https://a-us.storyblok.com/f/1016184/300x212/c02c23c595/ssd.svg", alt: "Logo 1" },
    { src: "https://a-us.storyblok.com/f/1016184/667x433/82bccd9495/mountain-tacticle.svg", alt: "Logo 2" },
    { src: "https://a-us.storyblok.com/f/1016184/115x37/42d462c708/diller.svg", alt: "Logo 3" },
    { src: "https://a-us.storyblok.com/f/1016184/215x141/fd9b957657/tilyo.svg", alt: "Logo 4" },
    { src: "https://a-us.storyblok.com/f/1016184/115x36/362db42cbf/carbon_collective_logo-dark.svg", alt: "Logo 5" },
    { src: "https://a-us.storyblok.com/f/1016184/167x40/cf679a2920/carbmee-dark.svg", alt: "Logo 6" },
    { src: "https://a-us.storyblok.com/f/1016184/220x34/9c6243368b/container.png", alt: "Logo 7" },
    { src: "https://a-us.storyblok.com/f/1016184/88x22/d18b658c92/hohme.svg", alt: "Logo 8" },
    { src: "https://a-us.storyblok.com/f/1016184/119x28/d59e4a9a5e/redsbaby.svg", alt: "Logo 9" },
    { src: "https://a-us.storyblok.com/f/1016184/300x120/ac248451a7/rushordertees-dark.svg", alt: "Logo 10" },
    { src: "https://a-us.storyblok.com/f/1016184/168x35/c14894d9df/semine.svg", alt: "Logo 11" },
    { src: "https://a-us.storyblok.com/f/1016184/116x63/d011f35a32/unifon.svg", alt: "Logo 12" },
    { src: "https://a-us.storyblok.com/f/1016184/110x110/db0ccd5580/meta-signals-logo-black.svg", alt: "Logo 13" },
    { src: "https://a-us.storyblok.com/f/1016184/221x91/8d63e8307a/link.png", alt: "Logo 14" },
    { src: "https://a-us.storyblok.com/f/1016184/220x78/3a045cb8d3/header-logo-b746c28b-1.png", alt: "Logo 15" },
    { src: "https://a-us.storyblok.com/f/1016184/220x68/7c10b5240f/frame-2.png", alt: "Logo 16" },
  ],
};

export const WithClients = Template.bind({});
WithClients.args = {
  bgColor: "#f5f5f5",
  revertColumn: true,
  title: "Our Clients",
  subtitle: "Happy Customers",
  description: "We are proud to have worked with these amazing clients.",
  titleColor: "#222222",
  descriptionColor: "#555555",
  clients: [
    { src: "https://via.placeholder.com/120x100?text=Client1", alt: "Client 1" },
    { src: "https://via.placeholder.com/120x100?text=Client2", alt: "Client 2" },
  ],
};
