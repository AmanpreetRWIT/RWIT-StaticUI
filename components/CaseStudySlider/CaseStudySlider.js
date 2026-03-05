import Image from "next/legacy/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import SectionTitle from "../common/SectionTitle";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { useState } from "react";
import { placeholderLight } from "../../helpers/utilities";

const CaseStudySlider = ({ data }) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: false,
    breakpoints: {
      "(max-width: 479px)": {
        slides: { spacing: 20 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      id="CaseStudySlider"
      className="axil-featured-area ax-section-gap bg-color-lightest"
      style={data?.BGColor?.color ? { background: data?.BGColor?.color } : {}}
    >
      <div className={`container`}>
        <div className="mb-4 mb-md-5 case-study__title">
          <SectionTitle
            title={data?.Title}
            description={data?.Description}
            alignment={data?.TextAlignment}
            titleColor={data?.TitleColor?.color ? data?.TitleColor?.color : ""}
            descriptionColor={
              data?.DescriptionColor?.color ? data?.DescriptionColor?.color : ""
            }
          />
        </div>
        <div
          className="container axil-featured-activation axil-carousel"
          ref={ref}
        >
          {data?.CaseStudyCard && data?.CaseStudyCard?.length > 0 && (
            <div id="slider-container">
              <div ref={sliderRef} className="keen-slider">
                {data.CaseStudyCard.map((item, index) => (
                  <div
                    className="keen-slider__slide row d-flex flex-wrap axil-featured row--0"
                    key={`slider-item-${index}`}
                  >
                    {item?.Image?.filename && (
                      <div className="col-lg-5 col-xl-5 col-md-12 col-12">
                        <div className="thumbnail">
                          <Image
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={placeholderLight}
                            width={512}
                            height={524}
                            className="image w-100"
                            src={item?.Image?.filename}
                            alt={item?.Image?.alt ? item?.Image?.alt : "image"}
                          />
                        </div>
                      </div>
                    )}
                    <div
                      className={`case-study__desc ${
                        item?.Image?.filename
                          ? "col-lg-6 col-xl-6 col-md-12 offset-xl-1 col-12 mt_md--40 mt_sm--40"
                          : "col-12 mt_md--40 mt_sm--40"
                      }`}
                    >
                      <div className="inner">
                        <div className="section-title text-start">
                          {item?.Tags &&
                            item.Tags.length > 0 &&
                            item.Tags.map((tag, index) => (
                              <span key={index} class="sub-title extra11-color" style={{color: "rgb(38, 144, 212)", border: "1px solid rgb(38, 144, 212)", background: "rgb(212, 233, 246);"}}>{tag}</span>
                            ))}
                          {item?.Heading && (
                            <h3 className="title custom-h2">{item.Heading}</h3>
                          )}
                          {item?.Description && (
                            <div className="subtitle-2">{item.Description}</div>
                          )}
                          {item?.Button &&
                            item.Button.map((button, index) => (
                              <a
                                key={index}
                                class="hoverable axil-button casestudy_btn btn-solid btn-large  "
                                target="_blank"
                                href={button.Link}
                              >
                                <span class="button-text hoverable px-0">
                                  {button?.Label}
                                </span>
                              </a>
                            ))}
                        </div>

                        <div className="axil-counterup-area d-flex flex-sm-wrap separator-line-vertical">
                          {item?.ShowCaseStudyStatistics && item?.CaseStudyStatistics &&
                            item.CaseStudyStatistics.map((stat, statIndex) => (
                              <div
                                className="single-counterup counterup-style-1"
                                key={`counter-item-${statIndex}`}
                              >
                                {stat?.CounterType && (
                                  <h3
                                    className={`count ${
                                      item.CaseStudyStatistics.length - 1 ===
                                      statIndex
                                        ? "counter-k"
                                        : ""
                                    }`}
                                  >
                                    <CountUp
                                      start={0}
                                      end={inView ? stat.Counter : 0}
                                    />
                                    {stat?.CounterType || ""}
                                  </h3>
                                )}
                                <p>{stat?.CounterTitle}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {loaded && instanceRef.current && (
                <div id="slider-container-wrapper">
                  {[
                    ...Array(
                      instanceRef.current.track.details.slides.length
                    ).keys(),
                  ].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => instanceRef.current?.moveToIdx(idx)}
                      aria-label="slider-button"
                      className={
                        "slider-dot" + (currentSlide === idx ? " active" : "")
                      }
                    ></button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudySlider;
