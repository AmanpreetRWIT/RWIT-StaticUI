//import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/style.scss';


import Hero from "../components/banner/Hero";
import HeroWithForm from "../components/banner/HeroWithForm";
 import HeroWithoutImage from '../components/banner/HeroWithoutImage';
 import HeroWithVerticalImage from '../components/banner/HeroWithVerticalImage';
 import ContactForm from '../components/forms/ContactForm';
 import FormInputs from '../components/forms/FormInputs';
 import BannerTwo from '../components/brands/BrandTwo';
 import BannerThree from '../components/brands/BrandThree';
 import CallToAction from '../components/call-to-actions/CallToAction';
 import CallToActionSlim from '../components/call-to-actions/CallToActionSlim';
 import CallToActionWithAvatar from '../components/call-to-actions/CallToActionWithAvatar';
 import CaseStudyDetails from '../components/CaseStudyGrid/CaseStudyDetails';
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
import CounterOne from '@/components/counters/Counter';
import CounterCardOne from '../components/counters/CounterCardOne';
import CounterTwo from '../components/counters/CounterTwoColumn';
import Faq from '../components/faq/Faq';
import OurGallery from '../components/gallery/OurGallery';
import JobListing from '../components/joblisting/JobListing';
import CaseStudySlide from '../components/MultiImageSlider/CaseStudySlide';
import NewsletterModal from '../components/newsletter/NewsletterModal';
import Newsletter from '../components/newsletter/Newsletter';
import Notice from '../components/notice/Notice';
import OurOffice from '../components/ouroffice/OurOffice';
import OurValues from '../components/ourvalues/OurValues';
import OurPartners from '../components/partners/Partners';
import Process from '../components/process/Process';
import ServiceCard from '../components/Services/ServiceCard';
import ServicesWithStickyCards from '../components/Services/ServicesWithStickyCards';
const components={
  Hero,
  HeroWithForm,
   HeroWithoutImage,
   HeroWithVerticalImage,
   ContactForm,
   FormInputs,
   BannerTwo,
   BannerThree,
   CallToAction,
   CallToActionSlim,
   CallToActionWithAvatar,
   CaseStudyDetails,
   CaseStudyGrid,
   CaseStudyMedia,
   ClientLogoSlider,
   ClientAndPartner,
   CaseStudySlider,
   CategoryCard,
   CmsHighlights,
   CompareTable,
   Comparison,
   ComparisonBanner,
   ImageComparisonSlider,
   Contact,
   CounterOne,
   CounterCardOne,
   CounterTwo,
   Faq,
   OurGallery,
   JobListing,
   CaseStudySlide,
   NewsletterModal,
   Newsletter,
   Notice,
   OurOffice,
   OurValues,
   OurPartners,
   Process,
   ServiceCard,
   ServicesWithStickyCards
  }

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
