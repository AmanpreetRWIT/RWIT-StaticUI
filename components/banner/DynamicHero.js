import HeroSection from "./Hero";

/**
 * DynamicHero — wrapper that accepts Payload CMS data (already
 * transformed by mapHeroToProps) and renders the existing Hero component.
 *
 * Falls back to static JSON data when CMS data is unavailable.
 */
const DynamicHero = ({ data, blok, fallbackData }) => {
    const heroProps = data || blok || fallbackData;

    if (!heroProps) return null;

    return <HeroSection {...heroProps} />;
};

export default DynamicHero;
