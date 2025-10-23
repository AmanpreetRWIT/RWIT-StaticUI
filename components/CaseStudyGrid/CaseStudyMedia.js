import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDateString, useMobile } from '../../helpers/utilities';

const CaseStudyMedia = ({ data }) => {
  let caseStudyData;
  try {
    caseStudyData = require('../../data/CaseStudyGrid/CaseStudyMedia.json');
  } catch (error) {
    console.error('caseStudyData.json not found:', error);
    caseStudyData = null;
  }

  const latestData = caseStudyData
    ? caseStudyData?.stories?.flatMap((study) =>
        study?.content?.body
          ?.filter((content) => content?.component === 'CaseStudyDetails')
          ?.map((caseStudyDetail) => ({
            ...caseStudyDetail,
            full_slug: study?.full_slug,
            published_at: study?.first_published_at,
          }))
          ?.sort((a, b) => {
            const beforeDate = DateTime.fromFormat(
              formatDateString(a.published_at),
              'MMMM dd yyyy'
            ).toMillis();
            const afterDate = DateTime.fromFormat(
              formatDateString(b.published_at),
              'MMMM dd yyyy'
            ).toMillis();
            return afterDate - beforeDate;
          })
      )
    : [];

  const caseStudy =
    data?.CaseStudies?.length > 0
      ? data?.CaseStudies?.flatMap((study) =>
          study?.content?.body
            ?.filter((content) => content?.component === 'CaseStudyDetails')
            ?.map((caseStudyDetail) => ({
              ...caseStudyDetail,
              full_slug: study?.full_slug,
              published_at: study?.first_published_at,
            }))
        )
      : latestData;

  const isMobile = useMobile();

  return (
    <>
      {caseStudy?.length > 0 && (
        <div className="casestudyMedia d-flex">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              type: 'bullets',
              clickable: true,
            }}
            navigation={true}
            loop={true}
            modules={[Autoplay, Pagination]}
            speed={0}
            className="container"
          >
            {caseStudy?.map((caseStudyDetails, index) => {
              return (
                <SwiperSlide key={index} id="casestudyMedia__slide">
                  <div
                    className={`casestudyMedia__container ${
                      data?.ReverseLayout ? 'casestudyMedia__reverse' : ''
                    }`}
                    style={
                      data?.BGColor?.color
                        ? {
                            background: data?.BGColor?.color,
                          }
                        : {}
                    }
                  >
                    <div className="casestudyMedia__content">
                      {data?.Tags && Array.isArray(data?.Tags) && (
                        <div className="section-title tag">
                          {data?.Tags?.map((tag, index) => (
                            <span key={index} className="tag-item">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="inner">
                        {caseStudyDetails?.Title && (
                          <h2
                            style={
                              data?.TitleColor?.color
                                ? {
                                    color: data?.TitleColor?.color,
                                  }
                                : {}
                            }
                            className="title"
                          >
                            {caseStudyDetails?.Title}
                          </h2>
                        )}

                        {caseStudyDetails?.Description && (
                          <p
                            className="custom-color desc"
                            style={
                              data?.DescriptionColor?.color
                                ? { color: data?.DescriptionColor?.color }
                                : {}
                            }
                          >
                            {isMobile
                              ? caseStudyDetails?.Description?.length > 150
                                ? caseStudyDetails?.Description.slice(0, 150) +
                                  '...'
                                : caseStudyDetails?.Description
                              : caseStudyDetails?.Description?.length > 345
                              ? caseStudyDetails?.Description.slice(0, 345) +
                                '...'
                              : caseStudyDetails?.Description}
                          </p>
                        )}
                        {caseStudyDetails?.full_slug && (
                          <div className="axil-button-group">
                            <Link
                              href={caseStudyDetails?.full_slug || '/'}
                              className={`hoverable axil-button btn-solid btn-large`}
                            >
                              <span className={`button-text hoverable px-0`}>
                                {caseStudyDetails?.Label || 'Read Case Study'}
                              </span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    {caseStudyDetails?.Image?.filename && (
                      <div
                        className="casestudyMedia__image"
                        style={{ position: 'relative' }}
                      >
                        <Image
                          loading="lazy"
                          width={681}
                          height={467}
                          className="image w-100 paralax-image"
                          src={caseStudyDetails?.Image?.filename}
                          alt={caseStudyDetails?.Image?.alt || 'blog image'}
                        />
                        {caseStudyDetails?.Logo?.filename && (
                          <div className="logo_wrapper">
                            <Image
                              loading="lazy"
                              width={134}
                              height={110}
                              className="logo_image"
                              src={caseStudyDetails?.Logo?.filename}
                              alt={caseStudyDetails?.Logo?.alt || 'logo'}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default CaseStudyMedia;
