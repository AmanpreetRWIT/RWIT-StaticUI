"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Grid, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import SectionTitle from '../common/SectionTitle';

const AwardsAndCertifications = ({ blok }) => {
    const [swiperInstance, setSwiperInstance] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% visible
  });

  useEffect(() => {
    if (swiperInstance && swiperInstance.autoplay) {
      if (inView) {
        swiperInstance.autoplay.start();
      } else {
        swiperInstance.autoplay.stop();
      }
    }
  }, [inView, swiperInstance]);

  const tagsSubtitle =
    blok?.Tags?.map((tag) => tag?.TagName).filter(Boolean).join(', ') || '';

  return (
    <section
      ref={ref}
      className='awards'
      style={blok?.BGColor?.color ? { background: blok.BGColor.color } : {}}
    >
      <div className='container'>
        {tagsSubtitle && (
          <SectionTitle subtitle={tagsSubtitle} alignment='center' />
        )}

        {blok?.Title && <h2 className='awards__title'>{blok.Title}</h2>}

        {blok?.Description && <p className='awards__subtitle'>{blok.Description}</p>}

        {/* Slider */}
        {blok?.Logos?.length > 0 && (
          <Swiper
            onSwiper={(swiper) => {
              swiper.autoplay.stop();
              setSwiperInstance(swiper);
            }}
            modules={[Pagination, Grid, Autoplay]}
            spaceBetween={40}
            slidesPerView={4}
            grid={{ rows: 2, fill: 'row' }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1, grid: { rows: 2 }, spaceBetween: 20 },
              640: { slidesPerView: 2, grid: { rows: 2 } },
              1024: { slidesPerView: 3, grid: { rows: 2 } },
              1224: { slidesPerView: 4, grid: { rows: 2 } },
            }}
            className='awards__slider'
          >
            {blok.Logos.map((item) => (
              <SwiperSlide key={item?._uid}>
                <div className='awards__card'>
                  {/* Background Shape */}
                  <Image src='/images/hex-shape.svg' alt='' fill className='awards__shape' />

                  {/* Logo Image */}
                  {item?.Image?.filename && (
                    <Image
                      src={item.Image.filename}
                      alt={item.Image.alt || ''}
                      width={120}
                      height={120}
                      className='awards__image'
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default AwardsAndCertifications;
