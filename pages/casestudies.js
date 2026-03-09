import Head from "next/head";

// Components
import Layout from "../components/layouts/Layout";
import HeroWithoutImage from "../components/banner/HeroWithoutImage";
import CaseStudySlider from "../components/CaseStudySlider/CaseStudySlider";
import CallToAction from "../components/call-to-actions/CallToAction";
import ClientAndPartner from "../components/client-and-partner/ClientAndPartner";
import CaseStudyGrid from "../components/CaseStudyGrid/CaseStudyGrid"; // optional if you have it
import ClientLogoSlider from "../components/client-and-partner/ClientLogoSlider";
import CaseStudyMedia from "../components/CaseStudyGrid/CaseStudyMedia";
import CounterTwo from "../components/counters/CounterTwoColumn";
import TestimonalSlider from "../components/testimonials/TestimonalSlider";
import ContentWithMedia from "../components/ContentWithMedia";
import CaseStudySlides from "../components/MultiImageSlider/CaseStudySlides";
// JSON Data
import caseStudySlider from "../data/CaseStudySlider/CaseStudySlider.json";
import callToAction from "../data/call-to-actions/CallToAction.json";
import clientAndPartner from "../data/client-and-partner/ClientAndPartner.json";
import caseStudyGridData from "../data/CaseStudyGrid/CaseStudyGrid.json"; // optional
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import NavigationSchema from "../schemas/NavigationSchemas.json";
import clientLogoSlider from "../data/client-and-partner/ClientLogoSlider.json";
import caseStudyMedia from "../data/CaseStudyGrid/CaseStudyMedia.json";
import counterTwo from "../data/counters/CounterTwoColumn.json";
import heroWithoutImage from "../data/banner/HeroWithoutImage.json";
import testimonalSlider from "../data/testimonials/TestimonalSlider.json";
import contentWithMedia from "../data/contentWithMedia/contentWithMedia.json";
import caseStudySlides from "../data/MultiImageSlider/CaseStudySlides.json";
import NoticeData from "../data/notice/Notice.json";


export default function CaseStudiesPage() {
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
  const pageTitle = "RW Infotech | Case Studies";
  const pageDescription = "Explore our successful projects and case studies at RW Infotech.";

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
        <HeroWithoutImage {...heroWithoutImage.Default}/>
        <ClientLogoSlider data={clientLogoSlider}/>
        <CaseStudyMedia data={caseStudyMedia}/>
        <CaseStudyGrid data={caseStudyGridData} />
        <CounterTwo {...counterTwo}/>
        <CallToAction {...callToAction} />
        <ClientAndPartner data={clientAndPartner} />
        <CaseStudySlider data={caseStudySlider} />
        <TestimonalSlider data={testimonalSlider}/>
        <ContentWithMedia {...contentWithMedia}/>
        <CaseStudySlides {...caseStudySlides}/>
      </Layout>
    </>
  );
}
