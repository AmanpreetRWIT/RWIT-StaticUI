import dynamic from "next/dynamic";

// Dynamic imports for all section components
const Hero = dynamic(() => import("../banner/DynamicHero"));
const AboutUs = dynamic(() => import("../abouts/AboutUs"));
const OurValues = dynamic(() => import("../ourvalues/OurValues"));
const CallToAction = dynamic(() => import("../call-to-actions/CallToAction"));
const Teams = dynamic(() => import("../teams/Teams"));
const BrandThree = dynamic(() => import("../brands/BrandThree"));
const OurGallery = dynamic(() => import("../gallery/OurGallery"));
const LatestStories = dynamic(() => import("../blogs/LatestStories"));
const Services = dynamic(() => import("../Services/Services"));
const HeroWithoutImage = dynamic(() => import("../banner/HeroWithoutImage"));
const CaseStudySlider = dynamic(() => import("../CaseStudySlider/CaseStudySlider"));
const ClientAndPartner = dynamic(() => import("../client-and-partner/ClientAndPartner"));
const CaseStudyGrid = dynamic(() => import("../CaseStudyGrid/CaseStudyGrid"));
const ClientLogoSlider = dynamic(() => import("../client-and-partner/ClientLogoSlider"));
const CaseStudyMedia = dynamic(() => import("../CaseStudyGrid/CaseStudyMedia"));
const CounterTwo = dynamic(() => import("../counters/CounterTwoColumn"));
const TestimonalSlider = dynamic(() => import("../testimonials/TestimonalSlider"));
const ContentWithMedia = dynamic(() => import("../ContentWithMedia"));
const CaseStudySlides = dynamic(() => import("../MultiImageSlider/CaseStudySlides"));
const HeroWithForm = dynamic(() => import("../banner/HeroWithForm"));
const ServicesWithLeftTitle = dynamic(() => import("../Services/ServicesWithLeftTitle"));
const CallToActionWithAvatar = dynamic(() => import("../call-to-actions/CallToActionWithAvatar"));
const Faq = dynamic(() => import("../faq/Faq"));
const Testimonial = dynamic(() => import("../testimonials/Testimonial"));
const HeroWithVerticalImage = dynamic(() => import("../banner/HeroWithVerticalImage"));
const BrandTwo = dynamic(() => import("../brands/BrandTwo"));
const ServicesWithStickyCards = dynamic(() => import("../Services/ServicesWithStickyCards"));
const Comparison = dynamic(() => import("../Comparison/Comparison"));
const Newsletter = dynamic(() => import("../newsletter/Newsletter"));
const RepeatableItems = dynamic(() => import("../content/RepeatableItems"));

const sectionComponents = {
    hero: Hero,
    aboutUs: AboutUs,
    ourValues: OurValues,
    callToAction: CallToAction,
    teams: Teams,
    brandThree: BrandThree,
    ourGallery: OurGallery,
    latestStories: LatestStories,
    services: Services,
    heroWithoutImage: HeroWithoutImage,
    caseStudySlider: CaseStudySlider,
    caseStudyGrid: CaseStudyGrid,
    clientLogoSlider: ClientLogoSlider,
    caseStudyMedia: CaseStudyMedia,
    counterTwo: CounterTwo,
    contentWithMedia: ContentWithMedia,
    caseStudySlides: CaseStudySlides,
    clientAndPartner: ClientAndPartner,
    faq: Faq,
    testimonial: Testimonial,
    heroWithForm: HeroWithForm,
    callToActionWithAvatar: CallToActionWithAvatar,
    servicesWithLeftTitle: ServicesWithLeftTitle,
    heroWithVerticalImage: HeroWithVerticalImage,
    brandTwo: BrandTwo,
    servicesWithStickyCards: ServicesWithStickyCards,
    comparison: Comparison,
    newsletter: Newsletter,
    repeatableItems: RepeatableItems,
};

export default function RenderSections({ sections }) {
    if (!sections || !Array.isArray(sections)) return null;

    return (
        <>
            {sections.map((section, index) => {
                const Component = sectionComponents[section.type];
                if (!Component) {
                    console.warn(`No component found for section type: ${section.type}`);
                    return null;
                }

                // Handle slightly different prop naming conventions across components
                const props = section.data;

                return <Component key={`${section.type}-${index}`} data={props} blok={props} {...props} />;
            })}
        </>
    );
}
