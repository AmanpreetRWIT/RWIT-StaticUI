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

const TestimonialsV2 = ({
  LayoutTwo = false,
  BGColor = { color: '#f8f9fa' },
  Heading = '',
  Tags = '',
  HeadingColor = { color: '#222' },
  Description = '',
  DescriptionColor = { color: '#555' },
  TestimonialCardTextColor = { color: '#333' },
  TestimonialCard = [],
  SelectClients = []
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const CardTextColor = TestimonialCardTextColor?.color;
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
  return (
    <>
      {!LayoutTwo ? (
        <div
          className="axil-testimonial-area ax-section-gap bg-color-lightest"
          id="testimonial-slider"
          style={BGColor.color ? { background: BGColor.color } : {}}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle
                  title={Heading}
                  subtitle={Tags}
                  titleColor={HeadingColor.color || ''}
                  alignment="center"
                />
                {Description && (
                  <p
                    className=" axil-subtitle"
                    style={DescriptionColor.color ? { color: DescriptionColor.color } : {}}
                  >
                    {Description}
                  </p>
                )}
              </div>

              {TestimonialCard && TestimonialCard.length > 0 ? (
                <div className="container axil-carousel" ref={ref}>
                  <div id="slider-container" style={{ position: 'relative' }}>
                    <div ref={sliderRef} className="keen-slider">
                      {TestimonialCard.map((item, index) => (
                        <div
                          className="keen-slider__slide  axil-featured "
                          key={`slider-item-${index}`}
                        >
                          {item?.ProfileImage?.filename && (
                            <div className="testimonial-img">
                              <div className="thumbnail">
                                <Image
                                  loading="lazy"
                                  width={getImageDimension(item?.ProfileImage?.filename).width}
                                  height={getImageDimension(item?.ProfileImage?.filename).height}
                                  className="image w-100"
                                  src={item?.ProfileImage?.filename}
                                  alt={item?.ProfileImage?.alt || 'image'}
                                />
                              </div>
                            </div>
                          )}

                          <div className={item?.ProfileImage?.filename ? ' content-box' : 'col-12 mt_md--40 mt_sm--40'}>
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
                                    {render(item?.Description)}
                                  </div>
                                )}
                                <div>
                                  {item?.Name && (
                                    <div className="content_title">
                                      <h4> {render(item?.Name)}</h4>
                                    </div>
                                  )}
                                  {item?.Designation && (
                                    <div className="content_subtitle">
                                      <p>{render(item?.Designation)}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="axil-counterup-area d-flex flex-wrap separator-line-vertical">
                                {item?.CaseStudyStatistics &&
                                  item?.CaseStudyStatistics.map((item, itemIndex) => (
                                    <div
                                      className="single-counterup counterup-style-1"
                                      key={`counter-item-${itemIndex}`}
                                    >
                                      <h3 className={`count ${item?.Counter?.length - 1 === itemIndex ? 'counter-k' : ''}`}>
                                        <CountUp start={0} end={inView ? item?.Counter : 0} />
                                        {item?.CounterType ? item?.CounterType : ''}
                                      </h3>
                                      <p>{item?.CounterTitle}</p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {loaded &&
                      instanceRef.current &&
                      TestimonialCard.length > 1 && (
                        <div id="slider-container-wrapper" className="slider-dots">
                          {[
                            ...Array(instanceRef.current.track.details.slides.length).keys(),
                          ].map((idx) => (
                            <button
                              key={idx}
                              aria-label="slider-button"
                              onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                              }}
                              className={
                                'slider-dot' + (currentSlide === idx ? ' active' : '')
                              }
                            ></button>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <div className="container axil-carousel" ref={ref}>
                  {SelectClients && SelectClients.length > 0 && (
                    <div id="slider-container" style={{ position: 'relative' }}>
                      <div ref={sliderRef} className="keen-slider">
                        {SelectClients.map((item, index) => (
                          <div
                            className="keen-slider__slide  axil-featured "
                            key={`slider-item-${index}`}
                          >
                            {item?.content?.ClientImage?.filename && (
                              <div className="testimonial-img">
                                <div className="thumbnail thumbnail2 ">
                                  <Image
                                    loading="lazy"
                                    width={getImageDimension(item?.content?.ClientImage?.filename).width}
                                    height={getImageDimension(item?.content?.ClientImage?.filename).height}
                                    className="image w-100"
                                    src={item?.content?.ClientImage?.filename}
                                    alt={item?.content?.ClientImage?.alt || 'image'}
                                  />
                                </div>
                              </div>
                            )}

                            <div className={item?.content ? ' content-box' : 'col-12 mt_md--40 mt_sm--40'}>
                              <div className="content">
                                <div className="content_wrap">
                                  <div className="content_icon">
                                    <Icon />
                                  </div>
                                  {item?.content && (
                                    <div
                                      className="content_desc custom-color"
                                      style={CardTextColor ? { color: CardTextColor } : {}}
                                    >
                                      {render(item?.content?.Testimonial)}
                                    </div>
                                  )}
                                  <div>
                                    {item?.content?.ContactPosition && (
                                      <div className="content_title">
                                        <h4>
                                          {' '}
                                          {render(
                                            item?.content?.FirstName +
                                              ' ' +
                                              item?.content?.LastName
                                          )}
                                        </h4>
                                      </div>
                                    )}
                                    {item?.content?.ContactPosition && (
                                      <div className="content_subtitle">
                                        <p>
                                          {render(item?.content?.ContactPosition)}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="axil-counterup-area d-flex flex-wrap separator-line-vertical">
                                  {item?.CaseStudyStatistics &&
                                    item?.CaseStudyStatistics.map((item, itemIndex) => (
                                      <div
                                        className="single-counterup counterup-style-1"
                                        key={`counter-item-${itemIndex}`}
                                      >
                                        <h3 className={`count ${item?.Counter?.length - 1 === itemIndex ? 'counter-k' : ''}`}>
                                          <CountUp start={0} end={inView ? item?.Counter : 0} />
                                          {item?.CounterType ? item?.CounterType : ''}
                                        </h3>
                                        <p>{item?.CounterTitle}</p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {loaded &&
                        instanceRef.current &&
                        SelectClients.length > 1 && (
                          <div id="slider-container-wrapper" className="slider-dots">
                            {[
                              ...Array(instanceRef.current.track.details.slides.length).keys(),
                            ].map((idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  instanceRef.current?.moveToIdx(idx);
                                }}
                                className={
                                  'slider-dot' + (currentSlide === idx ? ' active' : '')
                                }
                              ></button>
                            ))}
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <TestimonalSlider blok={{
          LayoutTwo,
          BGColor,
          Heading,
          Tags,
          HeadingColor,
          Description,
          DescriptionColor,
          TestimonialCardTextColor,
          TestimonialCard,
          SelectClients
        }} />
      )}
    </>
  );
};

export default TestimonialsV2;
