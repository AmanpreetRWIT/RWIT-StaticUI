import Head from "next/head";

// Components
import Layout from "@/components/layouts/Layout";
import HeroSection from "@/components/banner/Hero";
import ServicesWithLeftTitle from "@/components/Services/ServicesWithLeftTitle";
import TeamSpotlightCTA from "@/components/call-to-actions/TeamSpotlightCTA";
import VideoTestimonials from "@/components/testimonials/VideoTestimonials";
import ServicesWithStickyCards from "@/components/Services/ServicesWithStickyCards";
import AwardsAndCertifications from "@/components/AwardsAndCertifications/AwardsAndCertifications";
import FounderSpotlightCTA from "@/components/call-to-actions/FounderSpotlightCTA";
import ClientLogoSlider from "@/components/client-and-partner/ClientLogoSlider";
import CaseStudyMedia from "@/components/CaseStudyGrid/CaseStudyMedia";
import OurValues from "@/components/ourvalues/OurValues";
import ClutchMultipleTestimonials from "@/components/testimonials/ClutchMultipleTestimonials";
import Faq from "@/components/faq/Faq";
import CallToActionWithAvatar from "@/components/call-to-actions/CallToActionWithAvatar";
import Services from "@/components/Services/Services";
import ContentWithMedia from "@/components/ContentWithMedia";
import Counter from "@/components/counters/Counter";

// JSON Data
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import NoticeData from "@/data/notice/Notice.json";
import HeaderData from "@/data/layouts/Header.json";
import FooterData from "@/data/layouts/Footer.json";
import HeroSectionData from "@/data/banner/Hero.json";
import ServicesWithLeftTitleData from "@/data/Services/ServicesWithLeftTitle.json";
import TeamSpotlightCTAData from "@/data/call-to-actions/TeamSpotlightCTA";
import VideoTestimonialsData from "@/data/testimonials/VideoTestimonials.json";
import ServicesWithStickyCardsData from "@/data/Services/ServicesWithStickyCard.json";
import AwardsAndCertificationsData from "@/data/AwardsAndCertifications/AwardsAndCertifications.json";
import founderSpotlightCTA from "@/data/call-to-actions/FounderSpotlightCTA.json";
import clientLogoSlider from "@/data/client-and-partner/ClientLogoSlider.json";
import caseStudyMedia from "@/data/CaseStudyGrid/CaseStudyMedia.json";
import OurValuesData from "@/data/ourvalues/OurValues.json";
import ClutchMultipleTestimonialsData from "@/data/testimonials/ClutchMultipleTestimonials.json";
import faqData from "@/data/faq/Faq.json";
import CallToActionWithAvatarData from "@/data/call-to-actions/CallToActionWithAvatar.json";
import ServicesData from "@/data/Services/Services.json";
import ContentWithMediaData from "@/data/ContentWithMedia/ContentWithMedia.json";
import CounterData from "@/data/counters/Counter.json";

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
    settings: {...NoticeData},
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
        <HeroSection {...HeroSectionData} partnersLogo={[]} />
        <HeroSection {...HeroSectionData} partnersLogo={[]} textAlignment={""} gradientStyle={""} buttons={[]} showbannerImage={true} removeExtraPadding={true} />
        <ServicesWithLeftTitle blok={ServicesWithLeftTitleData} />
        <ContentWithMedia blok={ContentWithMediaData}/>
        <TeamSpotlightCTA blok={TeamSpotlightCTAData} />
        <Services blok={ServicesData} />
        <VideoTestimonials blok={VideoTestimonialsData} />
        <Counter {...CounterData} />
        <ServicesWithStickyCards blok={{ ...ServicesWithStickyCardsData, Button: []}} />
        <AwardsAndCertifications blok={AwardsAndCertificationsData} />
        <FounderSpotlightCTA blok={founderSpotlightCTA}/>
        <ClientLogoSlider data={{...clientLogoSlider, Logos: []}} />
        <CaseStudyMedia blok={caseStudyMedia} />
        <OurValues {...OurValuesData} Tags={""}/>
        <ClutchMultipleTestimonials blok={ClutchMultipleTestimonialsData} />
        <Faq {...faqData} />
        <CallToActionWithAvatar {...CallToActionWithAvatarData} />
      </Layout>
    </>
  );
}
