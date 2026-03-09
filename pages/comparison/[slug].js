import Head from "next/head";

// Components
import Layout from "../../components/layouts/Layout";
import CmsHighlights from "../../components/Comparison/CmsHighlights";
import CompareTable from "../../components/Comparison/CompareTable";

// JSON Data
import cmsHighlights from "../../data/Comparison/CmsHighlights";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import compareTable from "../../data/Comparison/CompareTable.json";
import NoticeData from "../../data/notice/Notice.json";

export default function ComparisonPage() {
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
  const pageTitle = "RW Infotech | Comparison";
  const pageDescription = "Compare our solutions and services at RW Infotech for better business decisions.";

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
        <CmsHighlights data={cmsHighlights}/>
        <CompareTable data={compareTable}/>
      </Layout>
    </>
  );
}
