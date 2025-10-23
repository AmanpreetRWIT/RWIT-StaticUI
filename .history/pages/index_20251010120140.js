// pages/index.js
//import Head from 'next/head';
//import Layout from '../components/layouts/Layout';
//components
import HeroSection from '../components/banner/Hero';
import HeroWithForm from '../components/banner/HeroWithForm';
import HeroWithoutImage from '../components/banner/HeroWithoutImage';
import HeroWithVerticalImage from '@/components/banner/HeroWithVerticalImage';
import BrandTwo from '../components/brands/BrandTwo'
import BrandThree from '../components/brands/BrandThree';
import CallToAction from '../components/call-to-actions/CallToAction';
import CallToActionSlim from '../components/call-to-actions/CallToActionSlim';
import CallToActionWithAvatar from '../components/call-to-actions/CallToActionWithAvatar';
import CaseStudyGrid from '../components/CaseStudyGrid/CaseStudyGrid';
import CaseStudyMedia from '../components/CaseStudyGrid/CaseStudyMedia';
import ClientLogoSlider from '../components/client-and-partner/ClientLogoSlider';
import ClientAndPartner from '../components/client-and-partner/ClientAndPartner';
import CaseStudySlider from '../components/CaseStudySlider/CaseStudySlider';
import CategoryCard from '../components/categorySlider/CategoryCard';
import CmsHighlights from '../components/Comparison/CmsHighlights';
import CompareTable from '../components/Comparison/CompareTable';
import Comparison from '../components/Comparison/Comparison';
import ComparisonBanner from '../components/Comparison/ComparisonBanner';
import ImageComparisonSlider from '../components/Comparison/ImageComparisonSlider';
import Contact from '../components/contact/Contact';
import CounterOne from '../components/counters/Counter';
import CounterCardOne from '../components/counters/CounterCardOne';
import CounterTwo from '../components/counters/CounterTwoColumn';
import Faq from '../components/faq/Faq';
import OurGallery from '../components/gallery/OurGallery';
import JobListing from '../components/joblisting/JobListing';
import Newsletter from '../components/newsletter/Newsletter';
import CaseStudySlide from '../components/MultiImageSlider/CaseStudySlide';
import CaseStudySlides from '../components/MultiImageSlider/CaseStudySlides';







//json
import heroData from '../data/banner/Hero.json';
import heroWithForm from '../data/banner/HeroWithForm.json';
import heroWithoutImage from '../data/banner/HeroWithoutImage.json';
import heroWithVerticalImage from '../data/banner/HeroWithVerticalImage.json';
import brandTwo from '../data/brands/BrandTwo.json';
import brandThree from '../data/brands/BrandThree.json';
import callToAction from '../data/call-to-actions/CallToAction.json';
import callToActionSlim from '../data/call-to-actions/CallToActionSlim.json';
import callToActionWithAvatar from '../data/call-to-actions/callToActionWithAvatar.json';
import caseStudyGrid from '../data/CaseStudyGrid/CaseStudyGrid.json';
import caseStudyMedia from '../data/CaseStudyGrid/CaseStudyMedia.json';
import clientLogoSlider from '../data/client-and-partner/ClientLogoSlider.json';
import clientAndPartner from '../data/client-and-partner/ClientAndPartner.json';
import caseStudySlider from '../data/CaseStudySlider/CaseStudySlider.json';
import categoryCard from '../data/categorySlider/CategoryCard.json';
import cmsHighlights from '../data/Comparison/CmsHighlights.json';
import compareTable from '../data/Comparison/CompareTable.json';
import comparison from '../data/Comparison/Comparison.json';
import comparisonBanner from '../data/Comparison/ComparisonBanner.json';
import imageComparisonSlider from '../data/Comparison/ImageComparisonSlider.json';
import contact from '../data/contact/Contact.json';
import counterOne from '../data/counters/Counter.json';
import counterCardOne from '../data/counters/CounterCardOne';
import counterTwo from '../data/counters/CounterTwoColumn.json';
import faqData from '../data/faq/Faq.json';
import ourGallery from '../data/OurGallery/OurGallery.json';

import newsletterData from '../data/newsletter/Newsletter.json';

import caseStudySlidesData from '../data/MultiImageSlider/CaseStudySlides.json';
import ourGallery from '../data/joblisting/JobListing.json';





//const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;

export default function HomePage() {
  // Debug: Log the data being passed to the component
  
  
  // const layoutSettings = {
  //   header: {
  //     style: 'four',
  //     leftColumn: 'col-lg-4 col-md-6 col-sm-6 col-8 header-left',
  //     rightColumn: 'col-lg-8 col-md-6 col-sm-6 col-4 header-right',
  //     headerMenus: [], // Empty for demo
  //   },
  //   footer: {
  //     style: 'three',
  //     footerData: [], // Empty for demo
  //     StickyFooter: false,
  //   },
  //   settings: {},
  // };

  return (
    <>
      <HeroSection {...heroData}/>
       <HeroWithForm {...heroWithForm} />
       <HeroWithoutImage {...heroWithoutImage.Default}/>
       <HeroWithVerticalImage {...heroWithVerticalImage.Default} /> 
        <BrandTwo {...brandTwo}/>
        <BrandThree {...brandThree}/>
        <CallToAction {...callToAction}/>
        <CallToActionSlim {...callToActionSlim}/>
        <CallToActionWithAvatar {...callToActionWithAvatar}/>
        <CaseStudyGrid {...caseStudyGrid}/>
        <CaseStudyMedia {...caseStudyMedia}/>
        <ClientLogoSlider data={clientLogoSlider}/>
        <ClientAndPartner data={clientAndPartner}/>
        <CaseStudySlider data={caseStudySlider}/>
        {/* <CategoryCard  blog={categoryCard[0]}/> */}
        <CmsHighlights data={cmsHighlights}/>
        <CompareTable data={compareTable}/>
        <Comparison data={comparison}/>
        <ComparisonBanner data={comparisonBanner}/>
        <ImageComparisonSlider {...imageComparisonSlider}/>
        <Contact {...contact}/>
        <CounterOne {...counterOne}/>
        <CounterCardOne {...counterCardOne}/>
  <CounterTwo {...counterTwo}/>
  <Faq {...faqData}/>
  <Newsletter {...newsletterData} />
  <OurGallery blok={ourGallery}/>
        <JobListing {...jobListing}/>
  <CaseStudySlides {...caseStudySlidesData} />
      {/* <Layout layoutSettings={layoutSettings}>
        <Head>
          <title>Home | Demo</title>
          <meta name="description" content="Demo homepage using Hero JSON" />
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href={site_url} />
        </Head>

        {/* Render Hero Section using JSON data */}
      {/* </Layout> */}
    </>
  );
}
