import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/pagination';

const CaseStudyList = ({ caseStudyDetails, href, locale }) => {
  const [swiper, setSwiper] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (swiper?.autoplay) {
      if (inView) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    }
  }, [inView, swiper]);

  return (
    <div className={`caseStudy__case`}>
      <div className='caseStudy__content'>
        <div className='caseStudy__header'>
          {(caseStudyDetails?.logoAlternate?.filename || caseStudyDetails?.Logo?.filename) && (
            <Image
              src={caseStudyDetails?.logoAlternate?.filename || caseStudyDetails?.Logo?.filename}
              className='caseStudy__logo'
              alt={caseStudyDetails?.Title ? `${caseStudyDetails.Title} logo` : 'Company logo'}
              width={21}
              height={52}
            />
          )}
          {caseStudyDetails?.Category && (
            <p className='caseStudy__category'>{caseStudyDetails?.Category}</p>
          )}
        </div>
        {caseStudyDetails?.Description && (
          <p className='caseStudy__desc'>{caseStudyDetails?.Description}</p>
        )}

        {caseStudyDetails?.TechnologyLogoSlider?.length > 0 && (
          <div className='caseStudy__tech'>
            <p className='caseStudy__tech-title'>Technologies:</p>
            <div className='caseStudy__tech-logos'>
              {caseStudyDetails?.TechnologyLogoSlider?.map((logo, index) => (
                <div className='caseStudy__techLogoCont' key={logo._uid || index}>
                  <Image
                    className='caseStudy__tech-logo'
                    src={logo?.Image?.filename}
                    alt={logo?.alt}
                    width={50}
                    height={50}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='axil-button-group caseStudyGrid__card-btn caseStudyBtn'>
          <Link
            href={href}
            locale={locale}
            legacyBehavior={false}
            className='hoverable axil-button axil-button btn-solid btn-solid btn-medium caseStudyGrid__btn '
          >
            <span className={`button-text hoverable px-0`}>
              {caseStudyDetails?.Label || 'Read Case Study'}
            </span>
          </Link>
        </div>
      </div>
      {caseStudyDetails?.FeaturedImagesSlider?.length > 0 && (
        <div className='caseStudy__featureImages' ref={ref}>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            onSwiper={setSwiper}
            className='caseStudySwiper'
            style={
              caseStudyDetails?.dotActiveColor?.color && caseStudyDetails?.dotInactiveColor?.color
                ? {
                    '--swiper-pagination-color': caseStudyDetails?.dotActiveColor?.color,
                    '--swiper-pagination-bullet-inactive-color':
                      caseStudyDetails?.dotInactiveColor?.color,
                    '--swiper-pagination-bullet-inactive-opacity': '1',
                  }
                : {}
            }
          >
            {caseStudyDetails?.FeaturedImagesSlider?.map((item, index) => (
              <SwiperSlide key={item._uid || index}>
                <Image
                  src={item?.Image?.filename}
                  className='caseStudy__featureImages'
                  alt={caseStudyDetails?.Title || 'Case Study Image'}
                  width={630}
                  height={542}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default CaseStudyList;
