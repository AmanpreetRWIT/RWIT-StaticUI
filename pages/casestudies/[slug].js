import Head from "next/head";

// Components
import Layout from "../../components/layouts/Layout";
import HeroWithoutImage from "../../components/banner/HeroWithoutImage";
import Testimonial from "../../components/testimonials/Testimonial";
import ContentWithMedia from "../../components/ContentWithMedia";
import CaseStudySlides from "../../components/MultiImageSlider/CaseStudySlides";
import HeroWithVerticalImage from "../../components/banner/HeroWithVerticalImage";
import CallToActionWithAvatar from "../../components/call-to-actions/CallToActionWithAvatar";
import RepeatableItems from "../../components/content/RepeatableItems";
// JSON Data
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import heroWithoutImage from "../../data/banner/HeroWithoutImage.json";
import contentWithMedia from "../../data/contentWithMedia/contentWithMedia.json";
import caseStudySlides from "../../data/MultiImageSlider/CaseStudySlides.json";
import heroWithVerticalImage from "../../data/banner/HeroWithVerticalImage.json";
import testimonial from "../../data/testimonials/Testimonial.json";
import callToActionWithAvatar from "../../data/call-to-actions/CallToActionWithAvatar.json";
import repeatableItems from "../../data/content/RepeatableItems.json";
import NoticeData from "../../data/notice/Notice.json";


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
        <HeroWithVerticalImage {...heroWithVerticalImage.Default} />
        <RepeatableItems blok={repeatableItems}/>
        <Testimonial data={testimonial}/>
        <ContentWithMedia {...contentWithMedia}/>
        <CaseStudySlides {...caseStudySlides}/>
        <CallToActionWithAvatar {...callToActionWithAvatar}/>
      </Layout>
    </>
  );
}
