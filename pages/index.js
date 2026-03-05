import Head from "next/head";

// Components
import Layout from "../components/layouts/Layout";
import HeroSection from "../components/banner/Hero";
import BrandTwo from "../components/brands/BrandTwo";
import BrandThree from "../components/brands/BrandThree";
import CallToAction from "../components/call-to-actions/CallToAction";
import CaseStudySlider from "../components/CaseStudySlider/CaseStudySlider";
import ClientAndPartner from "../components/client-and-partner/ClientAndPartner";
import Services from "../components/Services/Services";
import ServicesWithStickyCards from "../components/Services/ServicesWithStickyCards";
import CounterTwo from "../components/counters/CounterTwoColumn";
import Comparison from "../components/Comparison/Comparison";
import Testimonial from "../components/testimonials/Testimonial";
import Newsletter from "../components/newsletter/Newsletter";


// JSON Data
import heroData from "../data/banner/Hero.json";
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


export default function HomePage() {
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
        <HeroSection {...heroData} />
        <BrandTwo {...brandTwo} />
        <CaseStudySlider data={caseStudySlider} />
        <Services blok={services} />
        <ClientAndPartner data={clientAndPartner} />
        <CallToAction {...callToAction} />
        <BrandThree {...brandThree} />
        <CounterTwo {...counterTwo} />
        <Comparison data={comparison} />
        <ServicesWithStickyCards blok={servicesWithStickyCards} />
        <Testimonial data={testimonial} />
        <Newsletter data={newsletter} />
      </Layout>
    </>
  );
}
