import Head from "next/head";
import Layout from "../components/layouts/Layout";
import Services from "../components/Services/Services";
import JobListing from "../components/joblisting/JobListing";

// JSON Data
import jobListing from "../data/joblisting/JobListing.json";
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import contact from "../data/contact/Contact.json";
import services from "../data/Services/Services.json";
import NoticeData from "../data/notice/Notice.json";

export default function Career() {
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
  const pageTitle = "RW Infotech | Contact Us";
  const pageDescription =
    "Get in touch with RW Infotech for expert software, app, and web development solutions.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </Head>

      <Layout layoutSettings={layoutSettings}>
        <Services blok={services}/>
          <JobListing {...jobListing}/>
      </Layout>
    </>
  );
}
