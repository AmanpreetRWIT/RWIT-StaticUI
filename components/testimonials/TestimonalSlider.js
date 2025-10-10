import Image from 'next/legacy/image';
import SectionTitle from '../common/SectionTitle';
import 'keen-slider/keen-slider.min.css';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const TestimonalSlider = ({ data }) => {
  useEffect(() => {
    const wrapper = document.getElementById('testimonial-swiper');
    const desc = wrapper?.querySelectorAll('.testimonial-content.subtitle-3');
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
      document?.head?.appendChild(style);
    } else {
      console.error('Element not found:', selector);
    }
  }

  useEffect(() => {
    changeBeforeElementColor('.arrow-bottom', data?.TestimonialCardColor);
  }, [data?.TestimonialCardColor]);

  const renderSlideText = (text) => {
    if (!text) return '';
    return text.length > 350 ? text.slice(0, 350) + '...' : text;
  };

  const slides = data?.TestimonialCard && data?.TestimonialCard.length > 0
    ? data?.TestimonialCard
    : data?.SelectClients;

  return (
    <div
      id="testimonial-swiper"
      className="axil-featured-area ax-section-gap"
      style={data?.BGColor ? { background: data.BGColor } : {}}
    >
      <div className="container">
        <div className="mb-4 mb-md-5">
          <SectionTitle
            title={data?.Heading}
            description={data?.Description}
            alignment={data?.TextAlignment || 'center'}
            titleColor={data?.HeadingColor || ''}
            subtitle={data?.Tags}
            descriptionColor={data?.DescriptionColor || ''}
          />
        </div>

        {slides && slides.length > 0 && (
          <div className="axil-featured-activation axil-carousel">
            <div id="slider-container">
              <Swiper
                pagination={{
                  renderBullet: function (index, className) {
                    const profileImage =
                      slides[index]?.ProfileImage || slides[index]?.ClientImage;
                    return `
                      <span class="${className}">
                        ${
                          profileImage
                            ? `<img class="client-bullet" src="${profileImage}" alt="Client" />`
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
                {slides.map((card, index) => {
                  const desc = card?.Description || card?.Testimonial || '';
                  return (
                    <SwiperSlide
                      className="container w-100 h-auto"
                      key={`slider-item-${index}`}
                    >
                      <div
                        className="testimonial-slide col-12"
                        style={{
                          background: data?.TestimonialCardColor || '',
                          boxShadow: data?.TestimonialCardShadow
                            ? '0px 0px 2px 0px rgba(0, 2, 72, 0.12)'
                            : '',
                        }}
                      >
                        <div className="inner p-0">
                          <div className="section-title text-center">
                            {desc && (
                              <p className="testimonial-content subtitle-3">
                                {renderSlideText(desc)}
                              </p>
                            )}
                            <div className="client-info">
                              {card?.Name || card?.FirstName ? (
                                <h3 className="title subtitle-2">
                                  {card?.Name || card?.FirstName}
                                </h3>
                              ) : null}
                              {card?.Designation || card?.ContactPosition ? (
                                <span>
                                  {card?.Designation || card?.ContactPosition}
                                </span>
                              ) : null}
                            </div>
                            {card?.SelectStars || card?.SelectRatingStars ? (
                              <div className="stars">
                                {Array(
                                  Number(card?.SelectStars || card?.SelectRatingStars)
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
                            ) : null}
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
      </div>
    </div>
  );
};

export default TestimonalSlider;
