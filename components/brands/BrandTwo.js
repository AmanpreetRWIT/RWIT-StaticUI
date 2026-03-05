import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const BrandTwo = ({
  title,
  titleColor,
  bgColor,
  sliderBgColor,
  logos = [],
  clients = [],
  sliderSettings = {},
}) => {
  const animation = {
    duration: sliderSettings.speed || 14000,
    easing: (t) => t,
  };

  const looping = sliderSettings.autoplay ?? true;

  const [sliderRef] = useKeenSlider({
    loop: sliderSettings.infinite ?? true,
    renderMode: "performance",
    drag: true,
    mode: "free",
    slides: {
      perView: 2,
    },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 3 } },
      "(min-width: 1000px)": { slides: { perView: sliderSettings.slidesToShow || 4 } },
    },
    created(s) {
      looping && s.moveToIdx(5, true, animation);
    },
    updated(s) {
      looping && s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      looping && s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  const items = logos.length > 0 ? logos : clients;

  return (
    <div style={bgColor ? { background: bgColor } : {}}>
      <div className="container">
        <div className="pt--60 pb--60 pt_sm--30 pb_sm--30">
          <div className="clients" style={sliderBgColor ? { background: sliderBgColor } : {}}>
            {title && (
              <p style={titleColor ? { color: titleColor } : {}} className="mb-0 clients__title">
                {title}
              </p>
            )}
            {items.length > 0 && (
              <div className="clients__carousel pt--10 pb--10 pt_sm--0 pb_sm--0" style={!title ? { width: "100%" } : {}}>
                <div ref={sliderRef} className="keen-slider clients__list">
                  {items.map((brand, index) => (
                    <div key={index} className="clients__image keen-slider__slide">
                      {brand.src && (
                        <Image
                          loading="lazy"
                          width={brand.width || 120}
                          height={brand.height || 100}
                          src={brand.grayscale ? `${brand.src}?grayscale=1` : brand.src}
                          alt={brand.alt || "brand-logo"}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandTwo;
