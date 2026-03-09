import Image from "next/image";
import SectionTitle from "../common/SectionTitle";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { getImageDimension, useMobile } from "../../helpers/utilities";
import { useEffect, useState } from "react";

const BrandsThree = ({ blok }) => {
  const isMobile = useMobile();
  const [loaded, setLoaded] = useState(false);
  const [sliderRef] = useKeenSlider({
    initial: 0,
    mode: "free",
    slides: {
      perView: 2.3,
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    setLoaded(true);
  }, [isMobile]);

  return (
    <div
      className="axil-brand-area ax-section-gap bg-color-white"
      style={blok?.bgColor ? { background: blok?.bgColor } : {}}
    >
      <div id="brand__container" className="container">
        <div
          className={`brand__wrap row align-items-center justify-content-between ${
            blok?.revertColumn ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`${
              blok?.logos.length > 0 || blok?.clients.length > 0
                ? "col-xl-5 col-lg-5 col-md-12 col-12"
                : "col-12"
            }`}
          >
            <SectionTitle
              title={blok?.title}
              subtitle={blok?.subtitle}
              description={blok?.description}
              titleColor={blok?.titleColor}
              descriptionColor={blok?.descriptionColor}
              alignment="left"
            />
          </div>

          {(blok?.logos.length > 0 || blok?.clients.length > 0) && (
            <div className="brand__grid col-xl-7 col-lg-7 mt_md--40 mt_sm--40">
              <>
                {!(isMobile && loaded) ? (
                  <div className="axil-brand-logo-wrapper">
                    {blok?.logos.length > 0 ? (
                      <ul className="brand-list liststyle">
                        {blok?.logos.map((brand, index) => (
                          <li key={`brand-${index}`}>
                            {brand?.src && (
                              <span>
                                <Image
                                  loading="lazy"
                                  width={
                                    getImageDimension(brand.src, 120, 100).width
                                  }
                                  height={
                                    getImageDimension(brand.src, 120, 100)
                                      .height
                                  }
                                  src={
                                    brand.grayscale
                                      ? `${brand.src}/m/filters:grayscale()`
                                      : brand.src
                                  }
                                  alt={brand.alt || "brand-logo"}
                                />
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="brand-list liststyle">
                        {blok?.clients.map((brand, index) => (
                          <li key={`brand-${index}`}>
                            {brand?.src && (
                              <span>
                                <Image
                                  loading="lazy"
                                  width={
                                    getImageDimension(brand.src, 120, 100).width
                                  }
                                  height={
                                    getImageDimension(brand.src, 120, 100)
                                      .height
                                  }
                                  src={brand.src}
                                  alt={brand.alt || "brand-logo"}
                                />
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="axil-brand-logo-wrapper">
                    {blok?.logos.length > 0 ? (
                      <ul ref={sliderRef} className="brand-list keen-slider">
                        {blok?.logos.map((brand, index) => (
                          <li
                            key={`brand-${index}`}
                            className="keen-slider__slide"
                          >
                            {brand?.src && (
                              <span>
                                <Image
                                  loading="lazy"
                                  width={
                                    getImageDimension(brand.src, 120, 100).width
                                  }
                                  height={
                                    getImageDimension(brand.src, 120, 100)
                                      .height
                                  }
                                  src={
                                    brand.grayscale
                                      ? `${brand.src}/m/filters:grayscale()`
                                      : brand.src
                                  }
                                  alt={brand.alt || "brand-logo"}
                                />
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul ref={sliderRef} className="brand-list keen-slider">
                        {blok?.clients.map((brand, index) => (
                          <li
                            key={`brand-${index}`}
                            className="keen-slider__slide"
                          >
                            {brand?.src && (
                              <span>
                                <Image
                                  loading="lazy"
                                  width={
                                    getImageDimension(brand.src, 120, 100).width
                                  }
                                  height={
                                    getImageDimension(brand.src, 120, 100)
                                      .height
                                  }
                                  src={brand.src}
                                  alt={brand.alt || "brand-logo"}
                                />
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandsThree;
