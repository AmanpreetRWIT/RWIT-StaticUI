//import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/style.scss';
import dynamic from 'next/dynamic';

import HeroArea from "../components/banner/Hero"
// const Brands = dynamic(() => import('../components/brands/Brand'));
const Counter = dynamic(() => import('../components/counters/Counter'));
const CounterTwoColumn = dynamic(() => import('../components/counters/CounterTwoColumn'));
import Team from '../components/teams/Team';
const CallToAction = dynamic(() => import('../components/call-to-actions/CallToAction'));
const CaseStudySlider = dynamic(() => import('../components/CaseStudySlider/CaseStudySlider'));
const Services = dynamic(() => import('../components/Services/Services'));
const AboutUs = dynamic(() => import('../components/abouts/AboutUs'));
import OurValues from '../components/ourvalues/OurValues';
const Process = dynamic(() => import('../components/process/Process'));
const Faq = dynamic(() => import('../components/faq/Faq'));
const Pricing = dynamic(() => import('../components/pricings/Pricing'));
const Page = dynamic(() => import('../components/Storyblok/Page'));
const Button = dynamic(() => import('../components/buttons/Button'));
const Link = dynamic(() => import('../components/buttons/Link'));
const Testimonials = dynamic(() => import('../components/testimonials/Testimonial'));
import HeroWithoutImage from '../components/banner/HeroWithoutImage';
// import BrandsThree from '../components/brands/BrandsThree';
// import Contact from '../components/contact/Contact';
// const OurOffice = dynamic(() => import('../components/ouroffice/OurOffice'));
// const Tag = dynamic(() => import('../components/common/Tag'));
// const CaseStudy = dynamic(() => import('../components/Storyblok/CaseStudy'));
// const ContentWithMedia = dynamic(() => import('../components/ContentWithMedia'));
// import LatestStories from '../components/blogs/LatestStories';
// const ContentBlock = dynamic(() => import('../components/content/ContentBlock'));
// const Teams = dynamic(() => import('../components/teams/Teams'));
// const Technologies = dynamic(() => import('../components/technologies/Technologies'));
// const CallToActionContentWithImage = dynamic(() => import('../components/call-to-actions/CallToActionContentWithImage'));
// const ServiceswithFeaturedImage = dynamic(() => import('../components/Services/ServiceswithFeaturedImage'));
// const ServicesWithLeftTitle = dynamic(() => import('../components/Services/ServicesWithLeftTitle'));
// const global_reference = dynamic(() => import('../components/global_reference/global_reference'));
// const ServicesWithStickyCards = dynamic(() => import('../components/Services/ServicesWithStickyCards'));
// const ClientAndPartner = dynamic(() => import('../components/client-and-partner/ClientAndPartner'));
// const RepeatableItems = dynamic(() => import('../components/content/RepeatableItems'));
// import HeroWithVerticalImage from '../components/banners/HeroWithVerticalImage';
// const LoadOnScroll = dynamic(() => import('../components/Storyblok/LoadOnScroll'));
// const WhiteSpace = dynamic(() => import('../components/whitespace/WhiteSpace'));
// const CallToActionSlim = dynamic(() => import('../components/call-to-actions/CallToActionSlim'));
// import HeroWithForm from '../components/banners/HeroWithForm';
// const Table = dynamic(() => import('../components/table/Table'));
// import OurGallery from '../components/gallery/OurGallery';
// // for contact-form
// import ContactForm from '../components/forms/ContactForm';
// const FormInputs = dynamic(() => import('../components/forms/FormInputs'));
// const Email = dynamic(() => import('../components/validators/Email'));
// const Required = dynamic(() => import('../components/validators/Required'));
// const MaxLength = dynamic(() => import('../components/validators/MaximumLength'));
// const MinLength = dynamic(() => import('../components/validators/MinimumLength'));
// const Numeric = dynamic(() => import('../components/validators/Numeric'));
// const TestimonialsV2 = dynamic(() => import('../components/testimonials/TestimonialsV2'));
// import Comparison from '../components/Comparison/Comparison';
// import { useRouter } from 'next/router';
// import { separateSearchParams } from '../helpers/utilities';
// const PricingPlan = dynamic(() => import('../components/pricings/PricingPlan'));
// const CmsHighlights = dynamic(() => import('../components/Comparison/CmsHighlights'));
// import CompareTable from '../components/Comparison/CompareTable';
// import ComparisonBanner from '../components/Comparison/ComparisonBanner';
// const CallToActionWithAvatar = dynamic(() => import('../components/call-to-actions/CallToActionWithAvatar'));
// import BlogDescription from '../components/blogs/singlePageBlok/BlogDescription';
// import BlogTable from '../components/blogs/singlePageBlok/BlogTable';
// const OurPartners = dynamic(() => import('../components/partners/Partners'));
// import CodeView from '../components/blogs/singlePageBlok/CodeView';
// const TechnologyStack = dynamic(() => import('../components/technologies/TechnologyStack'));
// const Newsletter = dynamic(() => import('../components/newsletter/Newsletter'));
// import ImageComparisonSlider from '../components/Comparison/ImageComparisonSlider';
// const CaseStudySlides = dynamic(() => import('../components/MultiImageSlider/CaseStudySlides'));
// const CallToActionWithPopup = dynamic(() => import('../components/call-to-actions/CallToActionWithPopup'));
// const ClientLogoSlider = dynamic(() => import('../components/client-and-partner/ClientLogoSlider'));
// const CaseStudyGrid = dynamic(() => import('../components/CaseStudyGrid/CaseStudyGrid'));
// const CaseStudyMedia = dynamic(() => import('../components/CaseStudyGrid/CaseStudyMedia'));
// const CodeSyntax = dynamic(() => import('../components/blogs/CodeSyntax'));
// const CaseStudyDetails = dynamic(() => import('../components/CaseStudyGrid/CaseStudyDetails'));
// import JobListing from '../components/joblisting/JobListing';


const components={
  HeroArea,
  Counter,
  CounterTwoColumn,
  Team,
  CallToAction,
  page: Page,
  Button,
  Link,
  Testimonials,
  HeroWithoutImage,
  // CaseStudySlider,
  // Services,
  // AboutUs,
  // ContactForm,
  // FormInputs,
  // Email,
  // Required,
  // MaxLength,
  // MinLength,
  // Numeric,
  // BrandsThree,
  // OurValues,
  // Process,
  // Faq,
  // Pricing,
  // Contact,
  // OurOffice,
  // Tag,
  // ContentWithMedia,
  // LatestStories,
  // ContentBlock,
  // Teams,
  // Technologies,
  // CallToActionContentWithImage,
  // ServiceswithFeaturedImage,
  // ServicesWithLeftTitle,
  // global_reference,
  // ServicesWithStickyCards,
  // ClientAndPartner,
  // RepeatableItems,
  // HeroWithVerticalImage,
  // LoadOnScroll,
  // WhiteSpace,
  // CallToActionSlim,
  // HeroWithForm,
  // Table,
  // TestimonialsV2,
  // OurGallery,
  // Comparison,
  // PricingPlan,
  // CmsHighlights,
  // CompareTable,
  // ComparisonBanner,
  // CallToActionWithAvatar,
  // BlogDescription,
  // BlogTable,
  // OurPartners,
  // CodeView,
  // TechnologyStack,
  // Newsletter,
  // ImageComparisonSlider,
  // CaseStudySlides,
  // CallToActionWithPopup,
  // ClientLogoSlider,
  // CaseStudyGrid,
  // CaseStudyMedia,
  // CodeSyntax,
  // CaseStudyDetails,
  // JobListing,
  }

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
