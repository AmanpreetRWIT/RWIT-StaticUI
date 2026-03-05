import Head from "next/head";

// Components
import Layout from "../../components/layouts/Layout";
import HeroWithForm from "../../components/banner/HeroWithForm";
import ServicesWithLeftTitle from "../../components/Services/ServicesWithLeftTitle";
import Services from "../../components/Services/ServicesWithStickyCards";
import AboutUs from "../../components/abouts/AboutUs";
import CallToAction from "../../components/call-to-actions/CallToAction";
import ClientAndPartner from "../../components/client-and-partner/ClientAndPartner";
import CallToActionWithAvatar from "../../components/call-to-actions/CallToActionWithAvatar";
import Faq from "../../components/faq/Faq";
import Testimonial from "../../components/testimonials/Testimonial";
import ServicesWithStickyCards from "../../components/Services/ServicesWithStickyCards";
import TechnologyStack from "../../components/technologies/TechnologyStack";
import CallToActionSlim from "../../components/call-to-actions/CallToActionSlim";

// JSON Data
import aboutUsData from "../../data/abouts/AboutUs.json";
import callToAction from "../../data/call-to-actions/CallToAction.json";
import clientAndPartner from "../../data/client-and-partner/ClientAndPartner.json";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import callToActionWithAvatar from "../../data/call-to-actions/CallToActionWithAvatar.json";
import heroWithForm from "../../data/banner/HeroWithForm.json";
import servicesWithLeftTitle from "../../data/Services/ServicesWithLeftTitle.json";
import faq from "../../data/faq/Faq.json";
import testimonial from "../../data/testimonials/Testimonial.json";
import servicesWithStickyCards from "../../data/Services/ServicesWithStickyCard.json";
import technologyStack from "../../data/technologies/TechnologyStack.json";
import callToActionSlim from "../../data/call-to-actions/CallToActionSlim.json";

export default function AboutPage() {
  const layoutSettings = {
    header: {
      style: "four",
      leftColumn: "col-lg-4 col-md-6 col-sm-6 col-8 header-left",
      rightColumn: "col-lg-8 col-md-6 col-sm-6 col-4 header-right",
      ...HeaderData,
    },
    footer: {
      style: "three",
      ...FooterData,
      StickyFooter: true,
    },
    settings: {},
  };

  const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL || "https://rwit.io";
  const pageTitle = "RW Infotech | About";
  const pageDescription = "Learn more about RW Infotech and our mission, values, and clients.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:site_name" content="RW Infotech" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site_url} />
        <meta property="og:image" content={`${site_url}/images/meta-image.jpg`} />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="canonical" href={site_url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NavigationSchema) }}
        />
      </Head>

      <Layout layoutSettings={layoutSettings}>
        <HeroWithForm {...heroWithForm} />
        <ServicesWithLeftTitle blok={servicesWithLeftTitle}/>
        <AboutUs data={aboutUsData} />
        <CallToAction {...callToAction} />
        <ClientAndPartner data={clientAndPartner} />
        <CallToActionWithAvatar {...callToActionWithAvatar}/>
        <Faq {...faq}/>
        <Testimonial data={testimonial}/>
        <ServicesWithStickyCards blok={servicesWithStickyCards}/>
        <TechnologyStack data={technologyStack}/>
        <CallToActionSlim {...callToActionSlim}/>
      </Layout>
    </>
  );
}
