import Image from 'next/legacy/image';
import SectionTitle from '../common/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

const ClientLogoSlider = ({ data }) => {
  return (
    <div
      id="clientLogoSlider"
      className="clientLogoSlider"
      style={data?.BGColor?.color ? { background: data?.BGColor?.color } : {}}
    >
      <div className="clientLogoSlider__container container">
        <div className={`clientLogoSlider__wrapper`}>
          <div
            id="clientLogoSliderContent"
            className={`clientLogoSlider__content`}
          >
            <SectionTitle
              title={data?.Title}
              subtitle={data?.Tags}
              description={data?.Description}
              titleColor={data?.TitleColor?.color ? data?.TitleColor?.color : ''}
              descriptionColor={data?.DescriptionColor?.color ? data?.DescriptionColor?.color : ''}
              alignment="center"
            />
          </div>

          <div style={{ width: '100%', maxWidth: '1260px' }}>
            <Swiper
              slidesPerView={2.5}
              spaceBetween={30}
              freeMode={data?.FreeMode ? true : false}
              autoplay={
                data?.Autoplay
                  ? {
                      delay: Number(data?.SliderDelay || 2000),
                      disableOnInteraction: false,
                    }
                  : false
              }
              loop={data?.Loop ? true : 'false'}
              draggable={true}
              breakpoints={{
                640: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                991: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
                1224: {
                  slidesPerView: 8,
                  spaceBetween: 30,
                  freeMode: true,
                  loop: true,
                },
              }}
              modules={[Autoplay, FreeMode, Pagination]}
              className="mySwipe"
            >
              {data?.Logos?.length > 0 &&
                data?.Logos.map((logo, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      loading="lazy"
                      width={120}
                      height={100}
                      src={logo.Image.filename}
                      alt={logo.Image.alt || 'brand-logo'}
                      objectFit="contain"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogoSlider;
