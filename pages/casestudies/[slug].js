import Head from "next/head";

// Components
import Layout from "../../components/layouts/Layout";
import RenderSections from "../../components/common/RenderSections";

// JSON Data
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import heroWithoutImage from "../../data/banner/HeroWithoutImage.json";
import contentWithMedia from "../../data/contentWithMedia/contentWithMedia.json";
import caseStudySlides from "../../data/MultiImageSlider/CaseStudySlides.json";
import heroWithVerticalImage from "../../data/banner/HeroWithVerticalImage.json";
import testimonial from "../../data/testimonials/Testimonial.json";
import callToActionWithAvatar from "../../data/call-to-actions/CallToActionWithAvatar.json";
import repeatableItems from "../../data/content/RepeatableItems.json";

// Payload CMS data fetching
const { getPageBySlug, mapPageSections } = require("../../lib/payload");

export default function CaseStudyPage({ sections, slug }) {
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
  const pageTitle = `RW Infotech | ${slug?.charAt(0).toUpperCase() + slug?.slice(1) || 'Case Study'}`;
  const pageDescription = "Explore our successful projects and case studies at RW Infotech.";

  // Default sections for individual case study if none provided in CMS
  const fallbackSections = [
    { type: 'heroWithoutImage', data: heroWithoutImage.Default },
    { type: 'heroWithVerticalImage', data: heroWithVerticalImage.Default },
    { type: 'repeatableItems', data: repeatableItems },
    { type: 'testimonial', data: testimonial },
    { type: 'contentWithMedia', data: contentWithMedia },
    { type: 'caseStudySlides', data: caseStudySlides },
    { type: 'callToActionWithAvatar', data: callToActionWithAvatar }
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

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    // Try both with and without prefix
    let page = await getPageBySlug(`casestudies/${slug}`);
    if (!page) {
      page = await getPageBySlug(slug);
    }

    const sections = mapPageSections(page);

    return {
      props: {
        sections: sections.length > 0 ? sections : null,
        slug: slug,
      },
    };
  } catch (err) {
    console.error(`Payload fetch error on /casestudies/${slug}:`, err);
    return {
      props: {
        sections: null,
        slug: slug,
      },
    };
  }
}
