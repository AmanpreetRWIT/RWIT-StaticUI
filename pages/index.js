import Head from "next/head";

// Components
import Layout from "../components/layouts/Layout";
import HeroSection from "../components/banner/Hero";
import BrandTwo from "../components/brands/BrandTwo";
import BrandThree from "../components/brands/BrandThree";
import ServicesWithStickyCards from "../components/Services/ServicesWithStickyCards";
import Newsletter from "../components/newsletter/Newsletter";
import CaseStudyMedia from "../components/CaseStudyGrid/CaseStudyMedia";
import ClientLogoSlider from "../components/client-and-partner/ClientLogoSlider";
import IndustriesOverviewTab from "../components/industriesOverview/IndustriesOverviewTab";
import AwardsAndCertifications from "../components/AwardsAndCertifications/AwardsAndCertifications";
import TeamSpotlightCTA from "../components/call-to-actions/TeamSpotlightCTA";
import VideoTestimonials from "../components/testimonials/VideoTestimonials";
import ClutchMultipleTestimonials from "../components/testimonials/ClutchMultipleTestimonials";

// JSON Data
import heroData from "../data/banner/Hero.json";
import brandTwo from "../data/brands/BrandTwo.json";
import brandThree from "../data/brands/BrandThree.json";
import servicesWithStickyCards from "../data/Services/ServicesWithStickyCard.json";
import newsletter from "../data/newsletter/Newsletter.json";
import NoticeData from "../data/notice/Notice.json";
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import NavigationSchema from "../schemas/NavigationSchemas.json";
import caseStudyMedia from "../data/CaseStudyGrid/CaseStudyMedia.json";
import clientLogoSlider from "../data/client-and-partner/ClientLogoSlider.json";
import industriesOverviewTab from "../data/industriesOverview/IndustriesOverviewTab.json";
import awardsAndCertifications from "../data/AwardsAndCertifications/AwardsAndCertifications.json";
import teamSpotlightCTA from "../data/call-to-actions/teamSpotlightCTA.json";
import videoTestimonials from "@/data/testimonials/VideoTestimonials.json";
import clutchMultipleTestimonials from "@/data/testimonials/ClutchMultipleTestimonials.json";

export default function HomePage() {
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
  const pageTitle = "RW Infotech | Home";
  const pageDescription =
    "Welcome to RW Infotech. We provide expert software, app, and web solutions tailored to your business growth.";

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
         
          name="twitter:image"
         
          content={`${site_url}/images/meta-image.jpg`}
       
        />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="canonical" href={site_url} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NavigationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "RW Infotech",
              url: site_url,
              potentialAction: {
                "@type": "SearchAction",
                target: `${site_url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <Layout layoutSettings={layoutSettings}>
        <HeroSection {...heroData} />
        <BrandTwo {...brandTwo} />
        <ClientLogoSlider data={clientLogoSlider} />
        <CaseStudyMedia blok={caseStudyMedia} />
        <ServicesWithStickyCards blok={servicesWithStickyCards} />
        <IndustriesOverviewTab blok={industriesOverviewTab} />
        <AwardsAndCertifications blok={awardsAndCertifications} />
        <TeamSpotlightCTA blok={teamSpotlightCTA} />
        <BrandThree blok={brandThree} />
        <VideoTestimonials blok={videoTestimonials} />
        <ClutchMultipleTestimonials blok={clutchMultipleTestimonials} />
        <Newsletter data={newsletter} />
      </Layout>
    </>
  );
}
