import Hero from "../components/banner/Hero"; 

export default {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    titleColor:{control:"color"},
    headingColor:{control:"color"},
    descriptionColor:{control:"color"},
    textAlignment: {
            control: { type: "radio" }, 
            options: ["left", "center", "right"],
          },
    removeExtraPadding:{control:"boolean"},
    hideScrollToBottomIcon:{control:"boolean"},
    gradientStyle: "theme-gradient-7",
      },
};

export const WithPartners = {
  args: {
    title: "Tailor-made. Business-focused. Agile",
    titleColor:"#1b90dc",
    headingColor:"#000248",
    heading: "We create scalable solutions designed to empower growth",
    useH2Heading: false,
    description: "A Dubai-based digital agency with a global footprint, specializing in custom web development and headless application solutions.",
    showBadges: false,
    buttons: 
      {
        label: "Get in touch",
        href: "#",
      },
    
    partnerTitle: "Certified Agency Partners of",
    partnersLogo: [
      {
        src: "https://a-us.storyblok.com/f/1016184/300x77/1005293cf0/strapi_svgrepo_com-cropped-dark.svg",
        alt: "Partner1",
        href: "https://example.com",
      },
      {
        src: "https://a-us.storyblok.com/f/1016184/2500x502/7fcd5d58ac/sanity-dark.svg",
        alt: "Partner2",
      },
      {
        src: "https://a-us.storyblok.com/f/1016184/145x39/64e87eb0ba/prismic-dark-svg.svg",
        alt: "Partner2",
      },
      {
        src: "https://a-us.storyblok.com/f/1016184/145x43/ae3a011b6b/storyblok_logo-dark-svg.svg",
        alt: "Partner2",
      },
      {
        src: "https://a-us.storyblok.com/f/1016184/290x86/0114bd034a/bigcommerce.png",
        alt: "Partner2",
      }
    ],
    gradientStyle: "theme-gradient-7",
    hideScrollToBottomIcon:false,
  },
};

export const WithGridImages = {
  args: {
    title: "Grid Images Example",
    heading: "Showcase with Grid Layout",
    showGridImages: true,
    gridImages: [
      { src: "https://via.placeholder.com/238", alt: "Image1" },
      { src: "https://via.placeholder.com/238", alt: "Image2" },
      { src: "https://via.placeholder.com/238", alt: "Image3" },
      { src: "https://via.placeholder.com/238", alt: "Image4" },
    ],
  },
};

export const WithFlatColors = {
  args: {
    title: "Animated Flat Colors",
    heading: "Colorful Hero",
    showFlatColors: true,
    flatColors: [
      { color: "#FF6B6B" },
      { color: "#FFD93D" },
      { color: "#6BCB77" },
      { color: "#4D96FF" },
    ],
  },
};

