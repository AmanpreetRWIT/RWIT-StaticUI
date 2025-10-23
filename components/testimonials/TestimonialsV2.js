import Image from 'next/legacy/image';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { getImageDimension } from '../../helpers/utilities';
import SectionTitle from '../common/SectionTitle';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import React, { useState } from 'react';
import Icon from './Icon';
import TestimonalSlider from './TestimonalSlider';

const TestimonialsV2 = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const CardTextColor = data?.TestimonialCardTextColor;
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
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

  const testimonials = data?.TestimonialCard?.length
    ? data.TestimonialCard
    : data?.SelectClients;

  const isTestimonialCards = data?.TestimonialCard?.length > 0;

  if (data?.LayoutTwo) {
    return <TestimonalSlider data={data} />;
  }

  return (
    <div
      className="axil-testimonial-area ax-section-gap bg-color-lightest"
      id="testimonial-slider"
      style={data?.BGColor ? { background: data.BGColor } : {}}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={data?.Heading}
              subtitle={data?.Tags}
              titleColor={data?.HeadingColor || ''}
              alignment="center"
            />
            {data?.Description && (
              <p
                className="axil-subtitle"
                style={data?.DescriptionColor ? { color: data.DescriptionColor } : {}}
              >
                {data.Description}
              </p>
            )}
          </div>

          {testimonials && testimonials.length > 0 && (
            <div className="container axil-carousel" ref={ref}>
              <div id="slider-container" style={{ position: 'relative' }}>
                <div ref={sliderRef} className="keen-slider">
                  {testimonials.map((item, index) => (
                    <div
                      className="keen-slider__slide axil-featured"
                      key={`slider-item-${index}`}
                    >
                      {item?.ProfileImage?.filename && (
                        <div className="testimonial-img">
                          <div className="thumbnail">
                            <Image
                              loading="lazy"
                              width={getImageDimension(item.ProfileImage.filename).width}
                              height={getImageDimension(item.ProfileImage.filename).height}
                              className="image w-100"
                              src={item.ProfileImage.filename}
                              alt={item.ProfileImage.alt || 'image'}
                            />
                          </div>
                        </div>
                      )}

                      <div className={item?.ProfileImage?.filename ? 'content-box' : 'col-12 mt_md--40 mt_sm--40'}>
                        <div className="content">
                          <div className="content_wrap">
                            <div className="content_icon">
                              <Icon />
                            </div>

                            {item?.Description && (
                              <div
                                className="content_desc custom-color"
                                style={CardTextColor ? { color: CardTextColor } : {}}
                              >
                                {item.Description}
                              </div>
                            )}

                            <div>
                              {item?.Name && (
                                <div className="content_title">
                                  <h4>{item.Name}</h4>
                                </div>
                              )}
                              {item?.Designation && (
                                <div className="content_subtitle">
                                  <p>{item.Designation}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {item?.CaseStudyStatistics && (
                            <div className="axil-counterup-area d-flex flex-wrap separator-line-vertical">
                              {item.CaseStudyStatistics.map((stat, statIndex) => (
                                <div className="single-counterup counterup-style-1" key={statIndex}>
                                  <h3 className={`count ${item.CaseStudyStatistics.length - 1 === statIndex ? 'counter-k' : ''}`}>
                                    <CountUp start={0} end={inView ? stat.Counter : 0} />
                                    {stat.CounterType || ''}
                                  </h3>
                                  <p>{stat.CounterTitle}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {loaded && instanceRef.current && testimonials.length > 1 && (
                  <div id="slider-container-wrapper" className="slider-dots">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                      <button
                        key={idx}
                        aria-label="slider-button"
                        onClick={() => instanceRef.current?.moveToIdx(idx)}
                        className={'slider-dot' + (currentSlide === idx ? ' active' : '')}
                      ></button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default TestimonialsV2;
