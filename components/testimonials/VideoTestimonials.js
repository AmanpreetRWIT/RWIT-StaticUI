import { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import SectionTitle from '../common/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import VideoCard from './VideoCard';
import VideoSchemaHead from './VideoSchemaHead';
import 'swiper/css';
import 'swiper/css/pagination';

const VideoTestimonials = ({ blok }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const description = blok?.Description;
  const tagsSubtitle = blok?.Tags?.map((tag) => tag?.TagName).filter(Boolean).join(', ');

  return (
    <section className='video-testimonial'>
      <VideoSchemaHead blok={blok} />
      <div className='video-testimonial__container px-0'>
        {tagsSubtitle && <SectionTitle subtitle={tagsSubtitle} alignment='center' />}
        {blok?.Title && <h2 className='video-testimonial__heading'>{blok?.Title}</h2>}
        {blok?.descriptionBoolean && description && (
          <div
            className='video-testimonial__description'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        )}
        <div className='video-testimonial__inner'>
          {blok?.Cards?.length > 1 ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className='video-testimonial__slider'
            >
              {blok?.Cards?.map((data, index) => (
                <SwiperSlide key={data?._uid}>
                  <VideoCard data={data} isActive={activeIndex === index} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            blok?.Cards?.map((data) => <VideoCard key={data?._uid} data={data} isActive={true} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
