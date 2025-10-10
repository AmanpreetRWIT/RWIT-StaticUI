import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import TestimonialCard from './TestimonialCard';
import TestimonialClientCard from './TestimonialClientCard';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useMobile } from '../../helpers/utilities';

const Testimonial = ({ blok }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMobile();
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slides: {
        perView: 1,
      },

      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );
  const changeActive = (index) => {
    setActiveTestimonial(index);
  };
  return (
    <div
      className="axil-testimonial-area ax-section-gap bg-color-lightest"
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={blok?.Heading}
              subtitle={blok?.Tags}
              description={blok?.Description}
              titleColor={
                blok?.HeadingColor?.color ? blok?.HeadingColor?.color : ''
              }
              descriptionColor={
                blok?.DescriptionColor?.color
                  ? blok?.DescriptionColor?.color
                  : ''
              }
              alignment="center"
            />
          </div>
        </div>
        {!isMobile ? (
          <>
            <div className="row">
              {blok?.TestimonialCard && blok?.TestimonialCard.length > 0 ? (
                <div className="testimonial-activation">
                  <div className="row axil-testimonial-single">
                    {blok?.TestimonialCard &&
                      blok?.TestimonialCard.length > 0 &&
                      blok?.TestimonialCard?.map((testimonial, index) => (
                        <TestimonialCard
                          key={`twstimonial-${index}`}
                          column="col-xl-4 col-lg-6 col-md-12 mt--60 mt_sm--30 mt_md--30"
                          testimonialClass="axil-testimonial testimonial axil-control"
                          data={testimonial}
                          index={index}
                          activeIndex={activeTestimonial}
                          changeActive={changeActive}
                          TitleColor={
                            blok?.TestimonialCardTextColor?.color || ''
                          }
                        />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="testimonial-activation">
                  <div className="row axil-testimonial-single">
                    {blok?.SelectClients &&
                      blok?.SelectClients.length > 0 &&
                      blok?.SelectClients?.map((testimonial, index) => (
                        <TestimonialClientCard
                          key={`twstimonial-${index}`}
                          column="col-xl-4 col-lg-6 col-md-12 mt--60 mt_sm--30 mt_md--30"
                          testimonialClass="axil-testimonial testimonial axil-control"
                          data={testimonial}
                          index={index}
                          activeIndex={activeTestimonial}
                          changeActive={changeActive}
                          TitleColor={
                            blok?.TestimonialCardTextColor?.color || ''
                          }
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="row--0">
              {blok?.TestimonialCard && blok?.TestimonialCard.length > 0 ? (
                <div className="testimonial-activation">
                  <div className="row--0 axil-testimonial-single">
                    <div ref={sliderRef} className="keen-slider">
                      {blok?.TestimonialCard &&
                        blok?.TestimonialCard.length > 0 &&
                        blok?.TestimonialCard?.map((testimonial, index) => (
                          <TestimonialCard
                            key={`twstimonial-${index}`}
                            column="mt_sm--20 keen-slider__slide"
                            testimonialClass="axil-testimonial testimonial axil-control"
                            data={testimonial}
                            index={index}
                            activeIndex={activeTestimonial}
                            changeActive={changeActive}
                            TitleColor={
                              blok?.TestimonialCardTextColor?.color || ''
                            }
                          />
                        ))}
                    </div>
                    {loaded && instanceRef.current && (
                      <div id="slider-container-wrapper">
                        {[
                          ...Array(
                            instanceRef.current.track.details.slides.length
                          ).keys(),
                        ].map((idx) => {
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                              }}
                              aria-label="slider-button"
                              className={
                                'slider-dot' +
                                (currentSlide === idx ? ' active' : '')
                              }
                            ></button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="testimonial-activation">
                    <div className="row--0 axil-testimonial-single">
                      <div ref={sliderRef} className="keen-slider">
                        {blok?.SelectClients?.map((testimonial, index) => (
                          <TestimonialClientCard
                            key={`twstimonial-${index}`}
                            column="mt_sm--20 w-100 keen-slider__slide"
                            testimonialClass="axil-testimonial testimonial axil-control "
                            data={testimonial}
                            index={index}
                            activeIndex={activeTestimonial}
                            changeActive={changeActive}
                            TitleColor={
                              blok?.TestimonialCardTextColor?.color || ''
                            }
                          />
                        ))}
                      </div>
                      {loaded && instanceRef.current && (
                        <div id="slider-container-wrapper">
                          {[
                            ...Array(
                              instanceRef.current.track.details.slides.length
                            ).keys(),
                          ].map((idx) => {
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  instanceRef.current?.moveToIdx(idx);
                                }}
                                aria-label="slider-button"
                                className={
                                  'slider-dot' +
                                  (currentSlide === idx ? ' active' : '')
                                }
                              ></button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
