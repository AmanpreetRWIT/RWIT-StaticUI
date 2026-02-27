import Head from "next/head";
// Components
import Layout from "../components/layouts/Layout";
import RenderSections from "../components/common/RenderSections";

// JSON Data
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import jobListingData from "../data/joblisting/JobListing.json";
import servicesData from "../data/Services/Services.json";

// Payload CMS data fetching
const { getPageBySlug, mapPageSections } = require("../lib/payload");

export default function Career({ sections }) {
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
  const pageTitle = "RW Infotech | Careers";
  const pageDescription =
    "Explore career opportunities at RW Infotech and join our team of experts.";

  // Default sections if none provided in CMS
  const fallbackSections = [
    { type: 'services', data: servicesData },
    { type: 'jobListing', data: jobListingData }
  ];

  const finalSections = sections?.length > 0 ? sections : fallbackSections;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </Head>

      <Layout layoutSettings={layoutSettings}>
        <RenderSections sections={finalSections} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const page = await getPageBySlug("career");
    const sections = mapPageSections(page);

    return {
      props: {
        sections: sections.length > 0 ? sections : null,
      },
    };
  } catch (err) {
    console.error("Payload fetch error on /career:", err);
    return {
      props: {
        sections: null,
      },
    };
  }
}
