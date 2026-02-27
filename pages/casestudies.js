import Head from "next/head";

// Components
import Layout from "../components/layouts/Layout";
import RenderSections from "../components/common/RenderSections";

// JSON Data
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import NavigationSchema from "../schemas/NavigationSchemas.json";
import caseStudySliderData from "../data/CaseStudySlider/CaseStudySlider.json";
import callToActionData from "../data/call-to-actions/CallToAction.json";
import clientAndPartnerData from "../data/client-and-partner/ClientAndPartner.json";
import caseStudyGridData from "../data/CaseStudyGrid/CaseStudyGrid.json";
import clientLogoSliderData from "../data/client-and-partner/ClientLogoSlider.json";
import caseStudyMediaData from "../data/CaseStudyGrid/CaseStudyMedia.json";
import counterTwoData from "../data/counters/CounterTwoColumn.json";
import heroWithoutImageData from "../data/banner/HeroWithoutImage.json";
import testimonalSliderData from "../data/testimonials/TestimonalSlider.json";
import contentWithMediaData from "../data/contentWithMedia/contentWithMedia.json";
import caseStudySlidesData from "../data/MultiImageSlider/CaseStudySlides.json";

// Payload CMS data fetching
const { getPageBySlug, mapPageSections } = require("../lib/payload");

export default function CaseStudiesPage({ sections }) {
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
  const pageTitle = "RW Infotech | Case Studies";
  const pageDescription = "Explore our successful projects and case studies at RW Infotech.";

  // Default sections if none provided in CMS
  const fallbackSections = [
    { type: 'heroWithoutImage', data: heroWithoutImageData.Default },
    { type: 'clientLogoSlider', data: clientLogoSliderData },
    { type: 'caseStudyMedia', data: caseStudyMediaData },
    { type: 'caseStudyGrid', data: caseStudyGridData },
    { type: 'counterTwo', data: counterTwoData },
    { type: 'callToAction', data: callToActionData },
    { type: 'clientAndPartner', data: clientAndPartnerData },
    { type: 'caseStudySlider', data: caseStudySliderData },
    { type: 'testimonalSlider', data: testimonalSliderData },
    { type: 'contentWithMedia', data: contentWithMediaData },
    { type: 'caseStudySlides', data: caseStudySlidesData }
  ];

  const finalSections = sections?.length > 0 ? sections : fallbackSections;

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
        <RenderSections sections={finalSections} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const page = await getPageBySlug("casestudies");
    const sections = mapPageSections(page);

    return {
      props: {
        sections: sections.length > 0 ? sections : null,
      },
    };
  } catch (err) {
    console.error("Payload fetch error on /casestudies:", err);
    return {
      props: {
        sections: null,
      },
    };
  }
}
