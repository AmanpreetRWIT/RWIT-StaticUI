import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { placeholderLight } from "../../helpers/utilities";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HeroSection = ({
  title,
  titleColor,
  heading,
  headingColor,
  useH2Heading = false,
  description,
  descriptionColor,
  gradientStyle = "theme-gradient-7",
  bgColor,
  removeExtraPadding = false,
  textAlignment = "left",
  buttons,
  showBadges = false,
  logos = [],
  bannerImage,
  gridImages = [],
  flatColors = [],
  showGridImages = false,
  showFlatColors = false,
  partnersLogo = [],
  partnerTitle,
  hideScrollToBottomIcon = false,
}) => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 2.2 },
      },
      "(max-width: 991px)": {
        slides: { perView: 2.57 },
      },
      "(min-width: 400px) and (max-width: 576px)": {
        slides: { perView: 2.3 },
      },
      "(min-width: 400px) and (max-width: 480px)": {
        slides: { perView: 1.8 },
      },
      "(min-width: 350px) and (max-width: 399px)": {
        slides: { perView: 1.6 },
      },
    },
    mode: "free",
    slides: {
      perView: 2.9,
    },
  });

  const [randomNumber, setRandomNumber] = useState(null);
  const prevNumberRef = useRef(null);

  useEffect(() => {
    if (!showFlatColors || flatColors.length !== 4) {
      return;
    }
    const generateRandomNumber = () => {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 4);
      } while (newNumber === prevNumberRef.current);
      setRandomNumber(newNumber);
      prevNumberRef.current = newNumber;
    };

    generateRandomNumber();
    const timer = setInterval(generateRandomNumber, 150);

    return () => clearInterval(timer);
  }, [showFlatColors, flatColors]);

  return (
    <div
      id="hero"
      className={`test axil-slider-area axil-slide-activation ${
        !showFlatColors && !showGridImages && !bannerImage?.src
          ? `hero-${textAlignment}`
          : ""
      }`}
    >
      <div
        className={`axil-slide slide-style-4 ${gradientStyle} slider-fixed-height d-flex align-items-center pt--80 pb--80 pt_sm--40 pt_md--40 hero-align`}
        style={bgColor ? { background: bgColor } : {}}
      >
        <div
          className={`container position-relative ${
            removeExtraPadding ? "pt--40" : "pt--80 pb--80 pt_sm--40 pt_md--40"
          } align-container`}
        >
          <div
            className={`row align-items-center ${
              bannerImage?.src ? "flex" : ""
            } align-wrap`}
          >
            {/* LEFT SIDE CONTENT */}
            <div
              className={`col-lg-7 col-12 order-2 order-lg-1 mt_md--40 mt_sm--30 ${
                bannerImage?.src ? "hero-content" : ""
              } hero-align-content`}
            >
              <div className="content">
                {title && (
                  <span
                    className="title"
                    style={titleColor ? { color: titleColor } : {}}
                  >
                    {title}
                  </span>
                )}

                {heading &&
                  (useH2Heading ? (
                    <h2
                      className="axil-display-1 layer1"
                      style={headingColor ? { color: headingColor } : {}}
                    >
                      {heading}
                    </h2>
                  ) : (
                    <h1
                      className="axil-display-1 layer1"
                      style={headingColor ? { color: headingColor } : {}}
                    >
                      {heading}
                    </h1>
                  ))}

                {description && (
                  <div
                    className="layer2 custom-color"
                    style={descriptionColor ? { color: descriptionColor } : {}}
                  >
                    <p>{description}</p>
                  </div>
                )}

                {/* BUTTONS + LOGOS */}
                {showBadges ? (
                  <div className="hero-badges">
                    { (
                      <div className="slider-button gap-4 d-flex">
                            <a
                              className="hoverable axil-button  axil-button btn-solid 
                         btn-solid 
                        btn-large  "
                              target=""
                              href={buttons.href || "#"}
                            >
                              <span className="button-text hoverable px-0">
                                {buttons.label}
                              </span>
                            </a>
                      </div>
                    )}

                    {logos.length > 0 && (
                      <div
                        ref={sliderRef}
                        className="hero-badges-container keen-slider"
                      >
                        {logos.map((logo, idx) => (
                          <span
                            className="keen-slider__slide hero-badges-wrapper"
                            key={idx}
                          >
                            <Image
                              width={181}
                              height={56}
                              src={logo.src}
                              alt={logo.alt || `logo-${idx + 1}`}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {(
                      <div className="slider-button gap-4 d-flex">
                       <a className="hoverable axil-button  axil-button btn-solid 
                         btn-solid 
                        btn-large  "
                              target=""
                              href={buttons.href || "#"}
                            >
                              <span className="button-text hoverable px-0">
                                {buttons.label}
                              </span>
                            </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* RIGHT SIDE BANNER IMAGE */}
            {bannerImage?.src && (!showGridImages || !showFlatColors) && (
              <div className="col-lg-4 order-1 order-lg-2 mt_md--50 mt_sm--50 flex-grow-1">
                <div className="d-flex">
                  <div className="images">
                    <Image
                      loading="lazy"
                      width={487}
                      height={487}
                      className="object-fit-contain"
                      src={bannerImage.src}
                      alt={bannerImage.alt || "banner-image"}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* GRID IMAGES */}
            {!showFlatColors
              ? gridImages.every((img) => img.src) &&
                gridImages.length === 4 &&
                showGridImages && (
                  <div className="col-lg-4 order-1 order-lg-2 mt_md--50 flex-grow-1">
                    <div className="d-flex justify-content-center">
                      <div className="grid-images">
                        {gridImages.map((img, idx) => (
                          <div
                            key={idx}
                            className={`grid-images-img d-flex overflow-hidden grid-images-layout-${
                              idx === 0 ? "1" : idx === 3 ? "2" : "3"
                            }`}
                          >
                            <Image
                              src={img.src}
                              width={238}
                              height={238}
                              alt={img.alt || `banner_Image${idx + 1}`}
                              placeholder="blur"
                              blurDataURL={placeholderLight}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              : flatColors.every((c) => c.color) &&
                flatColors.length === 4 && (
                  <div className="col-lg-4 order-1 order-lg-2 mt_md--50 flex-grow-1">
                    <div className="d-flex justify-content-center">
                      <div className="grid-colors">
                        {flatColors.map((c, idx) => (
                          <div
                            key={idx}
                            className={`grid-colors-flat grid-colors-layout-${
                              idx === 0 ? "1" : idx === 3 ? "2" : "3"
                            } ${randomNumber === idx ? "active-color" : ""}`}
                            style={{ background: c.color || "#4FBAFF" }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
          </div>

          {/* PARTNERS */}
          {partnersLogo.length > 0 && (
            <div
              id="PartnerLogo"
              className={`partner ${
                showBadges ? "partner-with-badge" : "partner-without-badge"
              }`}
            >
              <div className="partner-wrapper">
                {partnerTitle && (
                  <h2 className="partner-title">{partnerTitle}</h2>
                )}

                <ul className="partner-logos d-flex">
                  {partnersLogo.map((partner, idx) => (
                    <li className="partner-logo d-flex" key={idx}>
                      {partner.href ? (
                        <Link
                          href={partner.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          prefetch={false}
                        >
                          <Image
                            src={partner.src}
                            width={145}
                            height={43}
                            alt={partner.alt || `Partner_${idx + 1}`}
                          />
                        </Link>
                      ) : (
                        <Image
                          src={partner.src}
                          width={145}
                          height={43}
                          alt={partner.alt || `Partner_${idx + 1}`}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* SCROLL ICON */}
          {hideScrollToBottomIcon && (
            <div className="scroll-down_btn">
              <div
                id="scrollDown"
                className="axil-scrollbown smoth-animation pointer-event"
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <span></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
