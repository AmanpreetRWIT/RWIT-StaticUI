
// pages/index.js
//import Head from 'next/head';
import Layout from '../components/layouts/Layout';
//components
import HeroSection from "../components/banner/Hero";
import HeroWithForm from "../components/banner/HeroWithForm";
import HeroWithoutImage from "../components/banner/HeroWithoutImage";
import HeroWithVerticalImage from "@/components/banner/HeroWithVerticalImage";
import BrandTwo from "../components/brands/BrandTwo";
import BrandThree from "../components/brands/BrandThree";
import CallToAction from "../components/call-to-actions/CallToAction";
import CallToActionSlim from "../components/call-to-actions/CallToActionSlim";
import CallToActionWithAvatar from "../components/call-to-actions/CallToActionWithAvatar";
import CaseStudyGrid from "../components/CaseStudyGrid/CaseStudyGrid";
import CaseStudyMedia from "../components/CaseStudyGrid/CaseStudyMedia";
import ClientLogoSlider from "../components/client-and-partner/ClientLogoSlider";
import ClientAndPartner from "../components/client-and-partner/ClientAndPartner";
import CaseStudySlider from "../components/CaseStudySlider/CaseStudySlider";
import CategoryCard from "../components/categorySlider/CategoryCard";
import CmsHighlights from "../components/Comparison/CmsHighlights";
import CompareTable from "../components/Comparison/CompareTable";
import Comparison from "../components/Comparison/Comparison";
import ComparisonBanner from "../components/Comparison/ComparisonBanner";
import ImageComparisonSlider from "../components/Comparison/ImageComparisonSlider";
import Contact from "../components/contact/Contact";
import CounterOne from "../components/counters/Counter";
import CounterCardOne from "../components/counters/CounterCardOne";
import CounterTwo from "../components/counters/CounterTwoColumn";
import Faq from "../components/faq/Faq";
import OurGallery from "../components/gallery/OurGallery";
import JobListing from "../components/joblisting/JobListing";
import CaseStudySlide from "../components/MultiImageSlider/CaseStudySlide";
import CaseStudySlides from "../components/MultiImageSlider/CaseStudySlides";
import Newsletter from "../components/newsletter/Newsletter";
import NewsletterModal from "../components/newsletter/NewsletterModal";
import Notice from "../components/notice/Notice";
import OurOffice from '../components/ouroffice/OurOffice';
import OurValues from '../components/ourvalues/OurValues';
import OurPartners from '../components/partners/Partners';
import ApplyPopup from '../components/popup/ApplyPopup';
import Process from "../components/process/Process";
import ServiceCard from "../components/Services/ServiceCard";
import Services from "../components/Services/Services";
import ServicesWithLeftTitle from "../components/Services/ServicesWithLeftTitle";
import ServicesWithStickyCards from "../components/Services/ServicesWithStickyCards";
import Pricing from '../components/pricings/Pricing';
import PricingPlan from '../components/pricings/PricingPlan';
import Table from '../components/table/Table';
import AboutUs from '../components/abouts/AboutUs';
import Testimonial from '../components/testimonials/Testimonial';

//json
import heroData from "../data/banner/Hero.json";
import heroWithForm from "../data/banner/HeroWithForm.json";
import heroWithoutImage from "../data/banner/HeroWithoutImage.json";
import heroWithVerticalImage from "../data/banner/HeroWithVerticalImage.json";
import brandTwo from "../data/brands/BrandTwo.json";
import brandThree from "../data/brands/BrandThree.json";
import callToAction from "../data/call-to-actions/CallToAction.json";
import callToActionSlim from "../data/call-to-actions/CallToActionSlim.json";
import callToActionWithAvatar from "../data/call-to-actions/callToActionWithAvatar.json";
import caseStudyGrid from "../data/CaseStudyGrid/CaseStudyGrid.json";
import caseStudyMedia from "../data/CaseStudyGrid/CaseStudyMedia.json";
import clientLogoSlider from "../data/client-and-partner/ClientLogoSlider.json";
import clientAndPartner from "../data/client-and-partner/ClientAndPartner.json";
import caseStudySlider from "../data/CaseStudySlider/CaseStudySlider.json";
import categoryCard from "../data/categorySlider/CategoryCard.json";
import cmsHighlights from "../data/Comparison/CmsHighlights.json";
import compareTable from "../data/Comparison/CompareTable.json";
import comparison from "../data/Comparison/Comparison.json";
import comparisonBanner from "../data/Comparison/ComparisonBanner.json";
import imageComparisonSlider from "../data/Comparison/ImageComparisonSlider.json";
import contact from "../data/contact/Contact.json";
import counterOne from "../data/counters/Counter.json";
import counterCardOne from "../data/counters/CounterCardOne";
import counterTwo from "../data/counters/CounterTwoColumn.json";
import faqData from "../data/faq/Faq.json";
import ourGallery from "../data/OurGallery/OurGallery.json";
import caseStudySlidesData from "../data/MultiImageSlider/CaseStudySlides.json";
import jobListing from "../data/joblisting/JobListing.json";
import newsletter from "../data/newsletter/Newsletter.json";
import newsletterModal from "../data/newsletter/NewsletterModal.json";
import notice from "../data/notice/Notice.json";
import ourOffice from '../data/ouroffice/OurOffice.json';
import ourValues from '../data/ourvalues/OurValues.json';
import ourPartners from '../data/partners/Partners.json';
import applyPopup from '../data/popup/ApplyPopup';
import process from "../data/process/Process.json";
import serviceCard from "../data/Services/ServiceCard.json";
import services from "../data/Services/Services.json";
import servicesWithLeftTitle from "../data/Services/ServicesWithLeftTitle.json";
import servicesWithStickyCards from "../data/Services/ServicesWithStickyCard.json";
import footer from "../data/layouts/Footer.json";
import header from '../data/layouts/Header.json';
import mainMenu from '../data/layouts/MainMenu.json';
import HeaderData from '../data/layouts/Header.json';
import FooterData from '../data/layouts/Footer.json';
import LayoutData from '../data/layouts/Layout.json';
import pricing from '../data/pricings/Pricing.json';
import pricingPlan from '../data/pricings/PricingPlan.json';
import table from '../data/table/Table';
import aboutUs from '../data/abouts/AboutUs';
import testimonial from '../data/testimonials/Testimonial.json';
//const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;

export default function HomePage() {

  const layoutSettings = {
    header: {
      style: 'four',
      leftColumn: 'col-lg-4 col-md-6 col-sm-6 col-8 header-left',
      rightColumn: 'col-lg-8 col-md-6 col-sm-6 col-4 header-right',
      ...HeaderData, // Empty for demo
    },
    footer: {
      style: 'three',
      ...FooterData, // Empty for demo
      StickyFooter: true,
    },
    settings: {},
  };  
  return (
    <>
    
    <Layout layoutSettings={layoutSettings} >
      
      

      <HeroSection {...heroData} />
      <HeroWithForm {...heroWithForm} />
      <HeroWithoutImage {...heroWithoutImage.Default} />
      <HeroWithVerticalImage {...heroWithVerticalImage.Default} />
      <BrandTwo {...brandTwo} />
      <BrandThree {...brandThree} />
      <CallToAction {...callToAction} />
      <CallToActionSlim {...callToActionSlim} />
      <CallToActionWithAvatar {...callToActionWithAvatar} />
      <CaseStudyGrid {...caseStudyGrid} />
      <CaseStudyMedia {...caseStudyMedia} />
      <ClientLogoSlider data={clientLogoSlider} />
      <ClientAndPartner data={clientAndPartner} />
      <CaseStudySlider data={caseStudySlider} />
      {/* <CategoryCard  blog={categoryCard[0]}/> */}
      <CmsHighlights data={cmsHighlights} />
      <CompareTable data={compareTable} />
      <Comparison data={comparison} />
      <ComparisonBanner data={comparisonBanner} />
      <ImageComparisonSlider {...imageComparisonSlider} />
      <Contact {...contact} />
      <CounterOne {...counterOne} />
      <CounterCardOne {...counterCardOne} />
      <CounterTwo {...counterTwo} />
      <Faq {...faqData} />
      <OurGallery blok={ourGallery} />
      <JobListing {...jobListing} />
      <CaseStudySlides {...caseStudySlidesData} />
      <Newsletter {...newsletter} />
      <NewsletterModal data={newsletterModal}/>
      <Notice {...notice}/>
      <OurOffice {...ourOffice}/>
      <OurValues {...ourValues}  />
      <OurPartners blok={ourPartners}/>
      {/* <ApplyPopup {...applyPopup}/> */}
      <Process blok={process}/>

      <ServiceCard {...serviceCard}/>
      <Services blok={services}/>
      <ServicesWithLeftTitle blok={servicesWithLeftTitle}/> 
      <ServicesWithStickyCards blok={servicesWithStickyCards}/>
      <Pricing data={pricing}/>
      <PricingPlan data={pricingPlan}/>
      <Table  data={table}/>
      <AboutUs data={aboutUs}/>
      <Testimonial data={testimonial}/>
      </Layout>
      
    </>
  );
}
