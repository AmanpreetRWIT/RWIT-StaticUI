import Head from "next/head";

// Components
import Layout from "../../components/layouts/Layout";
import RenderSections from "../../components/common/RenderSections";

// JSON Data
import heroData from "../../data/banner/Hero.json";
import aboutUsData from "../../data/abouts/AboutUs.json";
import callToAction from "../../data/call-to-actions/CallToAction.json";
import clientAndPartner from "../../data/client-and-partner/ClientAndPartner.json";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import services from "../../data/Services/Services.json";
import heroWithVerticalImageData from "../../data/banner/HeroWithVerticalImage.json";

// Payload CMS data fetching
const { getPageBySlug, mapPageSections } = require("../../lib/payload");

export default function IndustryPage({ sections, slug }) {
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
  const pageTitle = `RW Infotech | ${slug?.charAt(0).toUpperCase() + slug?.slice(1) || 'Industry'}`;
  const pageDescription = "Explore the industries we serve at RW Infotech.";

  // Default sections if none provided in CMS
  const fallbackSections = [
    { type: 'heroWithVerticalImage', data: heroWithVerticalImageData.Default },
    { type: 'aboutUs', data: aboutUsData },
    { type: 'callToAction', data: callToAction },
    { type: 'services', data: services },
    { type: 'clientAndPartner', data: clientAndPartner }
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
    // Try both with and without prefix for flexibility
    let page = await getPageBySlug(`industries/${slug}`);
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
    console.error(`Payload fetch error on /industries/${slug}:`, err);
    return {
      props: {
        sections: null,
        slug: slug,
      },
    };
  }
}
