import Head from "next/head";

// Components
import Layout from "../../components/layouts/Layout";
import HeroWithVerticalImage from "../../components/banner/HeroWithVerticalImage";
import HeroSection from "../../components/banner/Hero";
import AboutUs from "../../components/abouts/AboutUs";
import CallToAction from "../../components/call-to-actions/CallToAction";
import ClientAndPartner from "../../components/client-and-partner/ClientAndPartner";
import Services from "../../components/Services/Services";


// JSON Data
import heroData from "../../data/banner/Hero.json";
import aboutUsData from "../../data/abouts/AboutUs.json";
import callToAction from "../../data/call-to-actions/CallToAction.json";
import clientAndPartner from "../../data/client-and-partner/ClientAndPartner.json";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import services from "../../data/Services/Services.json";
import heroWithVerticalImage from "../../data/banner/HeroWithVerticalImage.json";
import NoticeData from "../../data/notice/Notice.json";


export default function AboutPage() {
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
  const pageTitle = "RW Infotech | About";
  const pageDescription = "Learn more about RW Infotech and our mission, values, and clients.";

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
        <HeroWithVerticalImage {...heroWithVerticalImage.Default}/>
        <AboutUs data={aboutUsData} />
        <CallToAction {...callToAction} />
        <Services blok={services}/>
        <ClientAndPartner data={clientAndPartner} />
      </Layout>
    </>
  );
}
