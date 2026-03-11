import Head from "next/head";

// Components
import Layout from "../../components/layouts/Layout";
import HeroWithForm from "../../components/banner/HeroWithForm";
import ServicesWithLeftTitle from "../../components/Services/ServicesWithLeftTitle";
import AboutUs from "../../components/abouts/AboutUs";
import CallToAction from "../../components/call-to-actions/CallToAction";
import ClientAndPartner from "../../components/client-and-partner/ClientAndPartner";
import CallToActionWithAvatar from "../../components/call-to-actions/CallToActionWithAvatar";
import Faq from "../../components/faq/Faq";
import Testimonial from "../../components/testimonials/Testimonial";
import ServicesWithStickyCards from "../../components/Services/ServicesWithStickyCards";
import TechnologyStack from "../../components/technologies/TechnologyStack";
import CallToActionSlim from "../../components/call-to-actions/CallToActionSlim";
import ClientFeedback from "@/components/ClientFeedback/ClientFeedback";
import BrandTwo from "@/components/brands/BrandTwo";
import TeamSpotlightCTA from "@/components/call-to-actions/TeamSpotlightCTA";
import VideoTestimonials from "@/components/testimonials/VideoTestimonials";
import OurValues from "@/components/ourvalues/OurValues";
import FounderSpotlightCTA from "@/components/call-to-actions/FounderSpotlightCTA";
import AwardsAndCertifications from "@/components/AwardsAndCertifications/AwardsAndCertifications";
import ClientLogoSlider from "@/components/client-and-partner/ClientLogoSlider";
import CaseStudyMedia from "@/components/CaseStudyGrid/CaseStudyMedia";
import ClutchMultipleTestimonials from "@/components/testimonials/ClutchMultipleTestimonials";
import Services from "@/components/Services/Services";

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
import clientFeedback from "@/data/ClientFeedback/ClientFeedback.json";
import NoticeData from "../../data/notice/Notice.json";
import brandTwo from "@/data/brands/BrandTwo.json";
import teamSpotlightCTA from "@/data/call-to-actions/TeamSpotlightCTA.json";
import videoTestimonials from "@/data/testimonials/VideoTestimonials.json";
import ourValues from "@/data/ourvalues/OurValues.json";
import founderSpotlightCTA from "@/data/call-to-actions/FounderSpotlightCTA.json";
import awardsAndCertifications from "@/data/AwardsAndCertifications/AwardsAndCertifications.json";
import clientLogoSlider from "@/data/client-and-partner/ClientLogoSlider.json";
import caseStudyMedia from "@/data/CaseStudyGrid/CaseStudyMedia.json";
import clutchMultipleTestimonials from "@/data/testimonials/ClutchMultipleTestimonials.json";
import services from "@/data/Services/Services.json";

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
    settings: { ...NoticeData },
  };

  const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL || "https://rwit.io";
  const pageTitle = "RW Infotech | About";
  const pageDescription =
    "Learn more about RW Infotech and our mission, values, and clients.";

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
        <meta
          property="og:image"
          content={`${site_url}/images/meta-image.jpg`}
        />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="canonical" href={site_url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NavigationSchema) }}
        />
      </Head>

      <Layout layoutSettings={layoutSettings}>
        <HeroWithForm {...heroWithForm} />
        <BrandTwo {...brandTwo} />
        <ServicesWithLeftTitle blok={servicesWithLeftTitle} />
        <TeamSpotlightCTA blok={teamSpotlightCTA} />
        <VideoTestimonials blok={videoTestimonials} />
        <ClientFeedback blok={clientFeedback} />
        <OurValues {...ourValues} />
        <FounderSpotlightCTA blok={founderSpotlightCTA} />
        <AwardsAndCertifications blok={awardsAndCertifications} />
        <ClientLogoSlider data={clientLogoSlider} />
        <CaseStudyMedia blok={caseStudyMedia} />
        <ClutchMultipleTestimonials blok={clutchMultipleTestimonials} />
        <Services blok={services} />
        <TechnologyStack data={technologyStack} />
        <Faq {...faq} />
        <CallToActionWithAvatar {...callToActionWithAvatar} />
        <CallToAction {...callToAction} />
        <AboutUs data={aboutUsData} />
        <ClientAndPartner data={clientAndPartner} />
        <Testimonial data={testimonial} />
        <ServicesWithStickyCards blok={servicesWithStickyCards} />
        <CallToActionSlim {...callToActionSlim} />
      </Layout>
    </>
  );
}
