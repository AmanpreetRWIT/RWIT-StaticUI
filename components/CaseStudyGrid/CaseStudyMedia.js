import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDateString, useMobile } from '../../helpers/utilities';
import { useState } from 'react';
import TechnologyLogos from '../Technologies-logo/TechnologiesLogo';

const CaseStudyMedia = ({ blok }) => {
  let caseStudyData;
  try {
    caseStudyData = require('../../public/caseStudyData.json');
  } catch (error) {
    console.error('caseStudyData.json not found:', error);
    caseStudyData = null;
  }



  const normalizeCaseStudy = (study) => {
    if (!study || typeof study !== 'object') return null;

    if (study.component === 'CaseStudyDetails') {
      return {
        ...study,
        uuid: study.uuid || study._uid,
      };
    }

    if (study?.content?.component === 'CaseStudyDetails') {
      return {
        ...study.content,
        uuid: study?.uuid || study?.content?.uuid,
        full_slug: study?.full_slug,
        published_at: study?.first_published_at,
      };
    }

    if (Array.isArray(study?.content?.body)) {
      const detail = study.content.body.find(
        (content) => content?.component === 'CaseStudyDetails'
      );
      if (detail) {
        return {
          ...detail,
          uuid: study?.uuid || detail?.uuid,
          full_slug: study?.full_slug,
          published_at: study?.first_published_at,
        };
      }
    }

    // Fallback for simple "page" entries (like those from CaseStudyMedia.json)
    if (study?.content?.component === 'page') {
      return {
        ...study.content,
        uuid: study?._uid || study?.uuid,
      };
    }

    return null;
  };

  const flattenCaseStudies = (studies = []) => studies.map(normalizeCaseStudy).filter(Boolean);

  const latestData = caseStudyData
    ? flattenCaseStudies(caseStudyData?.stories)?.sort((a, b) => {
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
    : [];

  const latestDataByUuid = latestData.reduce((acc, item) => {
    if (item?.uuid) {
      acc[item.uuid] = item;
    }
    return acc;
  }, {});

  const resolveSelectedCaseStudies = (selected = []) =>
    selected
      .map((entry) => {
        if (typeof entry === 'string') {
          return latestDataByUuid[entry] || null;
        }
        return normalizeCaseStudy(entry);
      })
      .filter(Boolean);

  const resolvedCaseStudies = resolveSelectedCaseStudies(blok?.CaseStudies);
  

  const caseStudy = resolvedCaseStudies.length > 0 ? resolvedCaseStudies : latestData;
  

  const isMobile = useMobile();
  const isTab = useMobile(991);
  const [active, setActive] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState(null);

  const [canSelect, setCanSelect] = useState(true);
  const handleActiveSlide = (index) => {
    if (!canSelect || active === index) return;
    setActive(index);
    setCanSelect(false);
    setTimeout(() => {
      setCanSelect(true);
    }, 350);
  };

  
  return (
    <>
      {caseStudy?.length > 0 && (
        <div id={blok?.Layout === 'layout-2' && 'collapsibleCaseStudy'} className='casestudyMedia'>
          {blok?.Layout === 'layout-1' ? (
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
              speed={500}
              className='container'
            >
              {caseStudy?.map((caseStudyDetails, index) => {
                return (
                  <SwiperSlide key={index} id='casestudyMedia__slide'>
                    <div
                      className={`casestudyMedia__container ${
                        blok?.ReverseLayout ? 'casestudyMedia__reverse' : ''
                      }`}
                      style={
                        blok?.BGColor?.color
                          ? {
                              background: blok?.BGColor?.color,
                            }
                          : {}
                      }
                    >
                      <div className='casestudyMedia__content'>
                        {blok?.Tags && (
                          <div className='section-title tag'>
                            {blok?.Tags && Array.isArray(blok?.Tags)
                              ? blok?.Tags?.map((tag, index) => (
                                  <div blok={tag} key={index} />
                                ))
                              : null}
                          </div>
                        )}
                        <div className='inner'>
                          {caseStudyDetails?.Title && (
                            <h2
                              style={
                                blok?.TitleColor?.color
                                  ? {
                                      color: blok?.TitleColor?.color,
                                    }
                                  : {}
                              }
                              className='title'
                            >
                              {caseStudyDetails?.Title}
                            </h2>
                          )}

                          {caseStudyDetails?.Description && (
                            <p
                              className='custom-color desc'
                              style={
                                blok?.DescriptionColor?.color
                                  ? { color: blok?.DescriptionColor?.color }
                                  : {}
                              }
                            >
                              {isMobile
                                ? caseStudyDetails?.Description?.length > 150
                                  ? caseStudyDetails?.Description?.slice(0, 150) + '...'
                                  : caseStudyDetails?.Description
                                : caseStudyDetails?.Description?.length > 345
                                ? caseStudyDetails?.Description?.slice(0, 345) + '...'
                                : caseStudyDetails?.Description}
                            </p>
                          )}
                          {caseStudyDetails?.full_slug && (
                            <div className='axil-button-group'>
                              <Link
                                href={caseStudyDetails?.full_slug || '/'}
                                className={`casestudy_btn hoverable axil-button btn-solid btn-large`}
                                locale={false}
                              >
                                <span className={`button-text hoverable px-0`}>
                                  {caseStudyDetails?.Label || 'Read Case Study'}
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                      {caseStudyDetails?.Image && caseStudyDetails?.Image?.filename && (
                        <div className='casestudyMedia__image' style={{ position: 'relative' }}>
                          <Image
                            loading='lazy'
                            width={681}
                            height={467}
                            className='image w-100 paralax-image'
                            src={caseStudyDetails?.Image?.filename}
                            alt={
                              caseStudyDetails?.Image?.alt
                                ? caseStudyDetails?.Image?.alt
                                : 'blog image'
                            }
                          />
                          {caseStudyDetails?.Logo && caseStudyDetails?.Logo?.filename && (
                            <div className='logo_wrapper'>
                              <Image
                                loading='lazy'
                                width={134}
                                height={110}
                                className='logo_image'
                                src={caseStudyDetails?.Logo?.filename}
                                alt={
                                  caseStudyDetails?.Logo?.alt
                                    ? caseStudyDetails?.Logo?.alt
                                    : 'blog image'
                                }
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
          ) : (
            <div className='container casestudyMedia__slides-wrapper'>
              {caseStudy?.map((caseStudyDetails, index) => {
                return (
                  <div
                    onClick={() => handleActiveSlide(index)}
                    onMouseEnter={() => setHoveredSlide(index)}
                    onMouseLeave={() => setHoveredSlide(null)}
                    key={index}
                    style={{
                      maxWidth:
                        !isTab &&
                        (active === index ? '834px' : hoveredSlide === index ? '150px' : '126px'),
                      maxHeight:
                        isTab &&
                        (active === index
                          ? isMobile
                            ? '200px'
                            : '335px'
                          : hoveredSlide === index
                          ? isMobile
                            ? '70px'
                            : '150px'
                          : isMobile
                          ? '64px'
                          : '126px'),
                    }}
                    className={`casestudyMedia__slide ${hoveredSlide === index ? 'hovered' : ''} ${
                      active === index ? 'active' : ''
                    }`}
                    id='casestudyMedia__slide'
                  >
                    <div
                      className={`casestudyMedia__container ${
                        blok?.ReverseLayout ? 'casestudyMedia__reverse' : ''
                      }`}
                      style={{
                        backgroundImage: `url(${caseStudyDetails?.Image?.filename})`,
                      }}
                    >
                      <div
                        className={`casestudyMedia__overlay ${active === index ? 'active' : ''}`}
                      />
                      {active === index && (
                        <div
                          className='casestudyMedia__logos-wrapper'
                          style={{
                            opacity: canSelect && active === index ? 1 : 0,
                          }}
                        >
                          <TechnologyLogos logos={caseStudyDetails?.TechnologyLogos || []} />
                        </div>
                      )}
                      <Link
                        href={caseStudyDetails?.full_slug || '/'}
                        className={`casestudyMedia-link ${active === index ? 'active' : ''}`}
                        locale={false}
                      ></Link>
                      <div
                        style={{
                          opacity: canSelect && active === index ? 1 : 0,
                          display: active === index ? 'block' : 'none',
                        }}
                        className='casestudyMedia__content'
                      >
                        <div className='inner'>
                          {caseStudyDetails?.Title && (
                            <h2
                              style={{
                                color: blok?.TitleColor?.color || 'white',
                              }}
                              className='title'
                            >
                              {caseStudyDetails?.Title}
                              <span className='fas title-arrow fa-external-link-alt'></span>
                            </h2>
                          )}
                          {!isTab && caseStudyDetails?.Description && (
                            <p
                              className='custom-color desc'
                              style={{
                                color: blok?.DescriptionColor?.color || 'white',
                              }}
                            >
                              {caseStudyDetails?.Description?.length > 75
                                ? caseStudyDetails?.Description?.slice(0, 75) + '...'
                                : caseStudyDetails?.Description}
                            </p>
                          )}
                          {!isTab && caseStudyDetails?.full_slug && (
                            <div className='axil-button-group'>
                              <Link
                                href={caseStudyDetails?.full_slug || '/'}
                                id='casestudyMedia-btn'
                                className={`casestudyMedia-btn casestudy_btn hoverable axil-button btn-solid btn-large`}
                                locale={false}
                              >
                                <span className={`button-text hoverable px-0`}>
                                  {caseStudyDetails?.Label || 'Read Case Study'}
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className='casestudyMedia__inactive-content'
                        style={{
                          display: active !== index ? 'flex' : 'none',
                        }}
                      >
                        {caseStudyDetails?.Title && (
                          <h3
                            className='casestudyMedia__vertical-title'
                            style={{
                              color: blok?.TitleColor?.color || 'white',
                            }}
                          >
                            {caseStudyDetails?.Title}
                          </h3>
                        )}
                        <div className='casestudyMedia__plus-icon'>
                          <svg
                            width='18px'
                            height='18px'
                            viewBox='0 0 32 32'
                            id='i-plus'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            stroke='#ffffff'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='4'
                          >
                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                            <g
                              id='SVGRepo_tracerCarrier'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              stroke='#ffffff'
                              strokeWidth='0.8320000000000001'
                            ></g>
                            <g id='SVGRepo_iconCarrier'>
                              <path d='M16 2 L16 30 M2 16 L30 16'></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CaseStudyMedia;
