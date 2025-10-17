import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import dynamic from 'next/dynamic';
const CategoryCard = dynamic(() => import('./CategoryCard'));
import Link from 'next/link';

const CategorySlider = ({ categoryTitle, categoryLink, blogs }) => {
  const swiperRef = useRef(null);

  const [latestBlogs, setLatestBlogs] = useState(blogs ? blogs : []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div id="categorySlide" className="categoryslides">
      <div className="categoryslides__cont">
        <Swiper slidesPerView={'auto'} className="category-slider-wrap">
          <SwiperSlide className="container">
            <div className="categoryslides__header container">
              <Link href={categoryLink || ''} className="categoryslides__title">
                <h2>{categoryTitle}</h2>
              </Link>

              <div className="categoryslides__navi">
                <span onClick={handlePrev} className=" categoryslides__prev">
                  <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.57813 1.29565C9.44555 1.16197 9.2878 1.05587 9.11401 0.983465C8.94021 0.911058 8.7538 0.873779 8.56552 0.873779C8.37724 0.873779 8.19083 0.911058 8.01703 0.983465C7.84324 1.05587 7.6855 1.16197 7.55291 1.29565L0.42187 8.42669C0.288194 8.55928 0.182092 8.71702 0.109685 8.89081C0.0372786 9.06461 0 9.25103 0 9.4393C0 9.62758 0.0372786 9.81399 0.109685 9.98779C0.182092 10.1616 0.288194 10.3193 0.42187 10.4519L7.55291 17.583C7.6855 17.7166 7.84324 17.8227 8.01703 17.8951C8.19083 17.9675 8.37724 18.0048 8.56552 18.0048C8.7538 18.0048 8.94021 17.9675 9.11401 17.8951C9.2878 17.8227 9.44555 17.7166 9.57813 17.583C9.71181 17.4504 9.81791 17.2926 9.89031 17.1188C9.96272 16.945 10 16.7586 10 16.5703C10 16.3821 9.96272 16.1957 9.89031 16.0219C9.81791 15.8481 9.71181 15.6903 9.57813 15.5577L3.44543 9.4393L9.57813 3.32087C9.71181 3.18828 9.81791 3.03054 9.89031 2.85674C9.96272 2.68295 10 2.49653 10 2.30826C10 2.11998 9.96272 1.93357 9.89031 1.75977C9.81791 1.58597 9.71181 1.42823 9.57813 1.29565Z"
                      fill="#000248"
                    />
                  </svg>
                </span>
                <span onClick={handleNext} className="categoryslides__next">
                  <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.42187 1.29565C0.554455 1.16197 0.712195 1.05587 0.885992 0.983465C1.05979 0.911058 1.2462 0.873779 1.43448 0.873779C1.62276 0.873779 1.80917 0.911058 1.98297 0.983465C2.15676 1.05587 2.3145 1.16197 2.44709 1.29565L9.57813 8.42669C9.71181 8.55928 9.81791 8.71702 9.89031 8.89081C9.96272 9.06461 10 9.25103 10 9.4393C10 9.62758 9.96272 9.81399 9.89031 9.98779C9.81791 10.1616 9.71181 10.3193 9.57813 10.4519L2.44709 17.583C2.3145 17.7166 2.15676 17.8227 1.98297 17.8951C1.80917 17.9675 1.62276 18.0048 1.43448 18.0048C1.2462 18.0048 1.05979 17.9675 0.885992 17.8951C0.712195 17.8227 0.554455 17.7166 0.42187 17.583C0.288195 17.4504 0.182093 17.2926 0.109686 17.1188C0.0372791 16.945 0 16.7586 0 16.5703C0 16.3821 0.0372791 16.1957 0.109686 16.0219C0.182093 15.8481 0.288195 15.6903 0.42187 15.5577L6.55457 9.4393L0.42187 3.32087C0.288195 3.18828 0.182093 3.03054 0.109686 2.85674C0.0372791 2.68295 0 2.49653 0 2.30826C0 2.11998 0.0372791 1.93357 0.109686 1.75977C0.182093 1.58597 0.288195 1.42823 0.42187 1.29565Z"
                      fill="#000248"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                991: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              navigation={false}
              modules={[Pagination, Navigation]}
              id="cardSwiper"
              className="cardSwiper container"
            >
              {latestBlogs?.map((blog, index) => (
                <SwiperSlide key={index}>
                  <CategoryCard blog={blog} />
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
