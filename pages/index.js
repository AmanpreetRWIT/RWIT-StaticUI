import Head from "next/head";

// Components
import Layout from "../components/layouts/Layout";
import RenderSections from "../components/common/RenderSections";

// Static JSON Data (fallback)
import staticHeroData from "../data/banner/Hero.json";
import brandTwo from "../data/brands/BrandTwo.json";
import brandThree from "../data/brands/BrandThree.json";
import callToAction from "../data/call-to-actions/CallToAction.json";
import caseStudySlider from "../data/CaseStudySlider/CaseStudySlider.json";
import clientAndPartner from "../data/client-and-partner/ClientAndPartner.json";
import services from "../data/Services/Services.json";
import servicesWithStickyCards from "../data/Services/ServicesWithStickyCard.json";
import counterTwo from "../data/counters/CounterTwoColumn.json";
import comparison from "../data/Comparison/Comparison.json";
import testimonial from "../data/testimonials/Testimonial.json";
import newsletter from "../data/newsletter/Newsletter.json";
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import NavigationSchema from "../schemas/NavigationSchemas.json";

// Payload CMS data fetching
const { getPageBySlug, mapPageSections } = require("../lib/payload");

export default function HomePage({ sections }) {
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
  const pageTitle = "RW Infotech | Home";
  const pageDescription =
    "Welcome to RW Infotech. We provide expert software, app, and web solutions tailored to your business growth.";

  // Default sections for homepage if none found in CMS
  const fallbackSections = [
    { type: 'hero', data: staticHeroData },
    { type: 'brandTwo', data: brandTwo },
    { type: 'caseStudySlider', data: caseStudySlider },
    { type: 'services', data: services },
    { type: 'clientAndPartner', data: clientAndPartner },
    { type: 'callToAction', data: callToAction },
    { type: 'brandThree', data: brandThree },
    { type: 'counterTwo', data: counterTwo },
    { type: 'comparison', data: comparison },
    { type: 'servicesWithStickyCards', data: servicesWithStickyCards },
    { type: 'testimonial', data: testimonial },
    { type: 'newsletter', data: newsletter }
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${site_url}/images/meta-image.jpg`} />
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
        <RenderSections sections={finalSections} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const page = await getPageBySlug("home");
    const sections = mapPageSections(page);

    return {
      props: {
        sections: sections.length > 0 ? sections : null,
      },
    };
  } catch (err) {
    console.error("Payload fetch error on homepage:", err);
    return {
      props: {
        sections: null,
      },
    };
  }
}
