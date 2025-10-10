import Image from 'next/legacy/image';

import SectionTitle from '../common/SectionTitle';
import 'keen-slider/keen-slider.min.css';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

const TestimonalSlider = ({ blok }) => {
  useEffect(() => {
    const wrapper = document.getElementById('testimonial-swiper');
    const desc = wrapper.querySelectorAll('.testimonial-content.subtitle-3');
    if (desc) {
      desc.forEach((des) => {
        const p = des.querySelectorAll('p');
        if (p) {
          p.forEach((para) => para.classList.add('subtitle-3'));
        }
      });
    }
  }, []);

  function changeBeforeElementColor(selector, color) {
    const element = document?.querySelector(selector);

    if (element) {
      const style = document?.createElement('style');
      style.innerHTML = `
        ${selector}::after {
          background-color: ${color}!important;
        }
      `;
      // Append the style element to the head
      document?.head?.appendChild(style);
    } else {
      console.error('Element not found:', selector);
    }
  }

  useEffect(() => {
    changeBeforeElementColor(
      '.arrow-bottom',
      blok?.TestimonialCardColor?.color
    );
  }, [blok?.TestimonialCardColor?.color]);

  return (
    <div
      id="testimonial-swiper"
      className="axil-featured-area ax-section-gap "
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div className={`container`}>
        <div className="mb-4 mb-md-5">
          <SectionTitle
            title={blok?.Heading}
            description={blok?.Description}
            alignment={blok?.TextAlignment || 'center'}
            titleColor={
              blok?.HeadingColor?.color ? blok?.HeadingColor?.color : ''
            }
            subtitle={blok?.Tags}
            descriptionColor={
              blok?.DescriptionColor?.color ? blok?.DescriptionColor?.color : ''
            }
          />
        </div>
        {blok?.TestimonialCard && blok?.TestimonialCard.length > 0 ? (
          <div className="axil-featured-activation axil-carousel">
            <div id="slider-container">
              <Swiper
                pagination={{
                  renderBullet: function (index, className) {
                    return `
                      <span class="${className}">
                        <img class="client-bullet" src="${blok?.TestimonialCard[index]?.ProfileImage?.filename}" alt="Client" />
                      </span>
                    `;
                  },
                  dynamicBullets: true,
                  clickable: true,
                }}
                speed={800}
                slidesPerView={1}
                centeredSlides
                modules={[Pagination]}
                className="testimonial-slider"
              >
                {blok?.TestimonialCard?.map((card, index) => {
                  let answer = '';
                  const desc = card?.Description;
                  if (desc) {
                    answer = desc?.content
                      ?.map((ans) =>
                        ans?.content?.map((val) => val?.text).join(' ')
                      )
                      .join(' ');
                  }
                  return (
                    <SwiperSlide
                      className="container w-100 h-auto"
                      key={`slider-item-${index}`}
                    >
                      <div
                        className={`testimonial-slide col-12`}
                        style={{
                          background: blok?.TestimonialCardColor?.color
                            ? blok?.TestimonialCardColor?.color
                            : '',
                          boxShadow: blok?.TestimonialCardShadow
                            ? '0px 0px 2px 0px rgba(0, 2, 72, 0.1215686275)'
                            : '',
                        }}
                      >
                        <div className="inner p-0">
                          <div className="section-title text-center">
                            {card?.Description && answer && (
                              <p className="testimonial-content subtitle-3">
                                {answer?.length > 350
                                  ? answer?.slice(0, 350) + '...'
                                  : answer}
                              </p>
                            )}
                            <div className="client-info">
                              {card?.Name && (
                                <h3 className="title subtitle-2">
                                  {card?.Name}
                                </h3>
                              )}
                              {card?.Designation && (
                                <span>{card?.Designation}</span>
                              )}
                            </div>
                            {card?.SelectStars && (
                              <div className="stars">
                                {Array(Number(card?.SelectStars))
                                  .fill(null)
                                  .map((_, i) => (
                                    <Image
                                      key={i}
                                      src="/images/star.svg"
                                      alt="Rating star"
                                      width={32}
                                      height={32}
                                    />
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="arrow-bottom"></div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        ) : (
          <>
            {blok?.SelectClients && blok?.SelectClients?.length > 0 && (
              <div className="axil-featured-activation axil-carousel">
                <div id="slider-container">
                  <Swiper
                    pagination={{
                      renderBullet: function (index, className) {
                        return `
                      <span class="${className}">
                        ${
                          blok?.SelectClients[index]?.content?.ClientImage
                            ?.filename
                            ? `<img class="client-bullet" src="${blok?.SelectClients[index]?.content?.ClientImage?.filename}" alt="Client" />`
                            : ''
                        }
                      </span>
                    `;
                      },
                      dynamicBullets: true,
                      clickable: true,
                    }}
                    speed={800}
                    slidesPerView={1}
                    centeredSlides
                    modules={[Pagination]}
                    className="testimonial-slider"
                  >
                    {blok?.SelectClients?.map((card, index) => {
                      let answer = '';
                      const desc = card?.content?.Testimonial;
                      if (desc) {
                        answer = desc?.content
                          ?.map((ans) =>
                            ans?.content?.map((val) => val?.text).join(' ')
                          )
                          .join(' ');
                      }
                      return (
                        <SwiperSlide
                          className="container w-100 h-auto"
                          key={`slider-item-${index}`}
                        >
                          <div
                            className={`testimonial-slide col-12`}
                            style={{
                              background: blok?.TestimonialCardColor?.color
                                ? blok?.TestimonialCardColor?.color
                                : '',
                              boxShadow: blok?.TestimonialCardShadow
                                ? '0px 0px 2px 0px rgba(0, 2, 72, 0.1215686275)'
                                : '',
                            }}
                          >
                            <div className="inner p-0">
                              <div className="section-title text-center">
                                {card?.content?.Testimonial && answer && (
                                  <div className="testimonial-content subtitle-3">
                                    <p className="subtitle-3">
                                      {answer?.length > 350
                                        ? answer?.slice(0, 350) + '...'
                                        : answer}
                                    </p>
                                  </div>
                                )}
                                <div className="client-info">
                                  {card?.content?.FirstName && (
                                    <h3 className="title subtitle-2">
                                      {card?.content?.FirstName}
                                    </h3>
                                  )}
                                  {card?.content?.ContactPosition && (
                                    <span>
                                      {card?.content?.ContactPosition}
                                    </span>
                                  )}
                                </div>
                                {card?.content?.SelectRatingStars && (
                                  <div className="stars">
                                    {Array(
                                      Number(card?.content?.SelectRatingStars)
                                    )
                                      .fill(null)
                                      .map((_, i) => (
                                        <Image
                                          key={i}
                                          src="/images/star.svg"
                                          alt="Rating star"
                                          width={32}
                                          height={32}
                                        />
                                      ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="arrow-bottom"></div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonalSlider;
