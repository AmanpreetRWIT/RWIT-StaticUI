import Head from "next/head";
// Components
import Layout from "../components/layouts/Layout";
import RenderSections from "../components/common/RenderSections";

// Static JSON Data
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import contact from "../data/contact/Contact.json";
import ourOfficeData from "../data/ouroffice/Ouroffice.json";
import callToAction from "../data/call-to-actions/CallToAction.json";

// Payload CMS data fetching
const { getPageBySlug, mapPageSections } = require("../lib/payload");

export default function ContactPage({ sections }) {
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
  const pageTitle = "RW Infotech | Contact Us";
  const pageDescription =
    "Get in touch with RW Infotech for expert software, app, and web development solutions.";

  // Default sections if none provided in CMS
  const fallbackSections = [
    { type: 'breadcrumb', data: { title: 'Contact Us', current: 'Contact' } },
    { type: 'contact', data: contact },
    { type: 'ourOffice', data: ourOfficeData },
    { type: 'callToAction', data: callToAction }
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
    const page = await getPageBySlug("contact");
    const sections = mapPageSections(page);

    return {
      props: {
        sections: sections.length > 0 ? sections : null,
      },
    };
  } catch (err) {
    console.error("Payload fetch error on /contact:", err);
    return {
      props: {
        sections: null,
      },
    };
  }
}
