import Head from "next/head";
import Layout from "../components/layouts/Layout";
import Contact from "../components/contact/Contact";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import OurOffice from "../components/ouroffice/OurOffice";
import CallToAction from "../components/call-to-actions/CallToAction";
// JSON Data
import heroData from "../data/banner/Hero.json";
import NoticeData from "../data/notice/Notice.json";
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import contact from "../data/contact/Contact.json";
import ourOffice from "../data/ouroffice/Ouroffice.json";
import callToAction from "../data/call-to-actions/CallToAction.json";


export default function ContactPage() {
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
        <Breadcrumb/>
          <Contact {...contact}/>
          <OurOffice {...ourOffice}/>
          <CallToAction {...callToAction}/>
      </Layout>
    </>
  );
}
