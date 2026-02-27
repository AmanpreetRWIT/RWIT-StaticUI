import Head from "next/head";

// Components
import Layout from "../components/layouts/Layout";
import RenderSections from "../components/common/RenderSections";

// Static JSON fallbacks
import staticHeroData from "../data/banner/Hero.json";
import aboutUsData from "../data/abouts/AboutUs.json";
import callToAction from "../data/call-to-actions/CallToAction.json";
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import NavigationSchema from "../schemas/NavigationSchemas.json";
import brandsThree from "../data/brands/BrandThree.json";
import ourValues from "../data/ourvalues/Ourvalues.json";
import teams from "../data/teams/Teams.json";
import ourGallery from "../data/OurGallery/OurGallery.json";
import latestStories from "../data/blogs/LatestStories.json";

// Payload CMS data fetching
const { getPageBySlug, mapPageSections } = require("../lib/payload");
import { useLivePreview } from "@payloadcms/live-preview-react";

export default function AboutPage({ sections: initialSections, page: initialPage }) {
  // Live preview hook
  const { data: livePage } = useLivePreview({
    initialData: initialPage,
    serverURL: (process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://127.0.0.1:3000/api").replace("/api", ""),
    depth: 2,
  });

  // Re-map sections if live data changes
  const sections = livePage ? mapPageSections(livePage) : initialSections;

  console.log("Live Preview Data State:", {
    initialTitle: initialPage?.title,
    liveTitle: livePage?.title,
    hasLivePage: !!livePage,
    sectionCount: sections?.length
  });

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

  // Default sections if none provided in CMS
  const fallbackSections = [
    { type: 'hero', data: staticHeroData },
    { type: 'brandThree', data: brandsThree },
    { type: 'aboutUs', data: aboutUsData },
    { type: 'ourValues', data: ourValues },
    { type: 'callToAction', data: callToAction },
    { type: 'teams', data: teams },
    { type: 'ourGallery', data: ourGallery },
    { type: 'latestStories', data: latestStories }
  ];

  // Current logic: if sections are provided from CMS, use them.
  // If no sections in CMS, use fallback.
  // If sections is null, it means no page was found in CMS, so show fallback.
  // If sections is an array (even empty), it means the page exists in CMS, so show its content.
  const finalSections = sections !== null ? sections : fallbackSections;

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
    const page = await getPageBySlug("about");
    if (!page) {
      console.log("No 'about' page found in Payload CMS.");
      return { props: { sections: null } };
    }

    const sections = mapPageSections(page);
    console.log(`Fetched ${sections.length} sections from CMS for 'about' page.`);

    // If the page exists but has 0 mapped sections, we still pass null to fallback,
    // but maybe the user wants to see an empty page?
    // For now, if they added a hero, it should be > 0.

    return {
      props: {
        page,
        sections: sections.length > 0 ? sections : null,
      },
    };
  } catch (err) {
    console.error("Payload fetch error on /about:", err);
    return {
      props: {
        page: null,
        sections: null,
      },
    };
  }
}
