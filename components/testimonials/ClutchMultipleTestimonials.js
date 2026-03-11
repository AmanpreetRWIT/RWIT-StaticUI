import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import SectionTitle from '../common/SectionTitle';
import Button from '../buttons/Button';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const VerifiedIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
    <path
      d='M7.16671 18.75L5.58337 16.0833L2.58337 15.4167L2.87504 12.3333L0.833374 10L2.87504 7.66667L2.58337 4.58333L5.58337 3.91667L7.16671 1.25L10 2.45833L12.8334 1.25L14.4167 3.91667L17.4167 4.58333L17.125 7.66667L19.1667 10L17.125 12.3333L17.4167 15.4167L14.4167 16.0833L12.8334 18.75L10 17.5417L7.16671 18.75ZM9.12504 12.9583L13.8334 8.25L12.6667 7.04167L9.12504 10.5833L7.33337 8.83333L6.16671 10L9.12504 12.9583Z'
      fill='#22996C'
    />
  </svg>
);

const ClutchMultipleTestimonials = ({ blok }) => {
  const sectionRef = useRef(null);
  const swiperInstance = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const sidebar = blok?.sidebar?.[0];
  const AUTOPLAY_DELAY = 5000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (swiperInstance.current && swiperInstance.current.autoplay) {
          if (entry.isIntersecting) {
            swiperInstance.current.autoplay.start();
          } else {
            swiperInstance.current.autoplay.stop();
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className='legacyTrust ax-section-gap bg-color-white'>
      <div className='legacyTrust__container container'>
        <SectionTitle
          title={blok?.Title}
          subtitle={blok?.Tags}
          description={blok?.Description}
          titleColor={blok?.TitleColor?.color}
          alignment='center'
        />
        <div className='legacyTrust__inner'>
          {/* Static Sidebar Card */}
          {sidebar?.Rating && (
            <div className='legacyTrust__sidebar'>
              <div
                className={
                  'legacyTrust__ratingCard' + (sidebar?.ContentCentre ? ' text-center' : '')
                }
              >
                <div className='legacyTrust__ratingHeader'>
                  {sidebar?.Rating && (
                    <h2 className='legacyTrust__ratingValue'>{sidebar?.Rating}</h2>
                  )}
                  {Array.from({
                    length: Math.max(0, Math.floor(Number(sidebar?.Rating) || 0)),
                  }).map((_, i) => (
                    <Image key={i} src='/images/star.svg' alt='star' width={20} height={20} />
                  ))}
                  <div
                    className='legacyTrust__ratingText'
                    dangerouslySetInnerHTML={{
                      __html: sidebar?.RatingText ? (sidebar?.RatingText) : '',
                    }}
                  />
                  {sidebar?.Image?.filename && (
                    <div className='legacyTrust__clutchLogo'>
                      <Image
                        src={sidebar?.Image?.filename}
                        alt='clutch'
                        draggable={false}
                        width={117}
                        height={42}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                  )}
                </div>
                <div className='legacyTrust__statsList'>
                  {sidebar?.CounterElement?.map((stat) => (
                    <div className='legacyTrust__statItem' key={stat._uid}>
                      {stat?.Number && <h4 className='legacyTrust__statValue'>{stat?.Number}</h4>}
                      {stat?.Description && (
                        <p className='legacyTrust__statLabel'>{stat?.Description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Slider */}
          <div className='legacyTrust__slider'>
            <div className='legacyTrust__sliderWrapper'>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{
                  el: `#legacyTrust__pagination-${blok?._uid}`,
                  clickable: true,
                  bulletActiveClass: 'swiper-pagination-bullet-active',
                  renderBullet: function (index, className) {
                    return `
            <span class="${className}">
              <span class="progress-bar-fill"></span>
            </span>
          `;
                  },
                }}
                autoplay={{
                  delay: AUTOPLAY_DELAY,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => {
                  swiperInstance.current = swiper;
                }}
                breakpoints={{
                  1200: {
                    slidesPerView: 1.5,
                  },
                  991: {
                    slidesPerView: 1.2,
                  },
                  768: {
                    slidesPerView: 1.3,
                  },
                }}
                className='legacyTrust__swiper'
                style={{
                  '--autoplay-duration': `${AUTOPLAY_DELAY}ms`,
                }}
              >
                {blok?.Cards?.map((testimonial) => (
                  <SwiperSlide key={testimonial?._uid}>
                    <div className='legacyTrust__card'>
                      {/* Title */}
                      {testimonial?.Title && (
                        <h3 className='legacyTrust__cardTitle'>{testimonial?.Title}</h3>
                      )}

                      {/* Rating */}
                      {testimonial?.Rating && (
                        <div className='legacyTrust__cardRating'>
                          <div className='legacyTrust__stars'>
                            {Array.from({
                              length: Math.max(0, Math.floor(Number(testimonial?.Rating) || 0)),
                            }).map((_, i) => (
                              <Image
                                key={i}
                                src='/images/star.svg'
                                alt='star'
                                width={20}
                                height={20}
                              />
                            ))}
                          </div>
                          <span className='legacyTrust__ratingValue'>{testimonial?.Rating}</span>
                        </div>
                      )}

                      {/* Description */}
                      {testimonial?.Description && (
                        <div
                          className='legacyTrust__description'
                          dangerouslySetInnerHTML={{
                            __html: testimonial?.Description
                              ? (testimonial?.Description)
                              : '',
                          }}
                        />
                      )}

                      {/* Author */}
                      <div className='legacyTrust__author'>
                        {testimonial?.Image?.filename && (
                          <Image
                            src={testimonial?.Image?.filename}
                            alt={testimonial?.Name}
                            width={56}
                            height={56}
                            className='legacyTrust__authorImage'
                          />
                        )}
                        <div className='legacyTrust__authorInfo'>
                          <div className='legacyTrust__authorNameWrapper'>
                            {testimonial?.Name && (
                              <h4 className='legacyTrust__authorName'>{testimonial?.Name}</h4>
                            )}
                            {testimonial?.verified && (
                              <div className='legacyTrust__verificationIcon'>
                                <VerifiedIcon />
                              </div>
                            )}
                          </div>
                          {testimonial?.Designation && (
                            <p className='legacyTrust__authorTitle'>{testimonial?.Designation}</p>
                          )}
                        </div>
                        {testimonial?.verified && (
                          <span className='legacyTrust__verifiedBadge'>
                            <VerifiedIcon />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              id={`legacyTrust__pagination-${blok?._uid}`}
              className={`legacyTrust__pagination ${isInView ? 'legacyTrustProgress-active' : ''}`}
            />
          </div>

          {/* CTA */}
          <div className='legacyTrust__actions col-lg-4'>
            {(blok?.Button || []).map((button, index) => {
              const processedButton = {
                ...button,
                Link: button?.Link
                  ? {
                      ...button.Link,
                      url:
                        button.Link?.story?.url === undefined && button.Link?.cached_url
                          ? button.Link.cached_url
                          : button.Link?.url,
                    }
                  : undefined,
              };
              return <Button blok={processedButton} key={button._uid} Index={index} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClutchMultipleTestimonials;
