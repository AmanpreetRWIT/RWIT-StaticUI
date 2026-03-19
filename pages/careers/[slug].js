import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { trimKeywords } from '../../helpers/utilities';
import NavigationSchema from '../../schemas/NavigationSchemas.json';
import Link from 'next/link';
import careerData from '../../public/careerData.json';
import Layout from '../../components/layouts/Layout';
import Tag from '../../components/common/Tag';
import BlogDescription from "@/components/blogs/singlePageBlok/BlogDescription";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NoticeData from "../../data/notice/Notice.json";
import applyPopup from '../../data/popup/ApplyPopup.json';

const ApplyPopup = dynamic(() => import('../../components/popup/ApplyPopup'));

const CareersPage = ({
  Slug,
  Settings,
  CareerArchive,
  locale,
  defaultLocale,
  careerdescription
}) => {
  const website_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;

  const canonicalUrl =
    locale === defaultLocale
      ? `${website_url}/careers/${Slug}`
      : `${website_url}/${locale}/careers/${Slug}`;

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const shareOptionsRef = useRef(null);
  const shareBtn = useRef(null);
  const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;

  const layoutSettings = {
      header: {
        style: "four",
        leftColumn: "col-lg-4 col-md-6 col-sm-6 col-8 header-left",
        rightColumn: "col-lg-8 col-md-6 col-sm-6 col-4 header-right",
        ...HeaderData,
      },
      footer: {
        style: "three",
        ...FooterData,
        StickyFooter: true,
      },
      settings: { ...NoticeData },
    };

  const trimmedFocusKeyword = trimKeywords(CareerArchive?.content?.FocusKeyword);

  const handleClickOutside = (event) => {
    if (shareOptionsRef?.current && !shareOptionsRef.current.contains(event?.target)) {
      setShowSocials(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsActive(false);
    setIsPopupVisible(false);
  };

  const handleApply = () => {
    setIsActive(true);
    setIsPopupVisible(true);
  };

  const applySettings = {
    Form: applyPopup?.Form,
    PopupTitle: applyPopup?.PopupTitle,
    PopupDescription: applyPopup?.PopupDescription,
  };

  return (
    <>
      <Layout layoutSettings={layoutSettings}>
        <Head>
          <title>{`Career - ${CareerArchive?.content?.Title}` || ''}</title>
          <meta name='keywords' content={trimmedFocusKeyword || ''} />
          <link rel='canonical' href={CareerArchive?.content?.CanonicalLink || canonicalUrl} />
        </Head>

        <main className='page-wrapper career-page'>
          <div
            id='hero'
            className='hero axil-slide slide-style-4 pb--60 theme-gradient'
            style={
              CareerArchive?.content?.BGColor?.color
                ? { background: CareerArchive?.content?.BGColor?.color }
                : {}
            }
          >
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='content inner'>
                    <div className={`hero__details row`}>
                      {CareerArchive?.content?.CareerTitle && (
                        <span className='title'>{CareerArchive?.content?.CareerTitle}</span>
                      )}

                      {CareerArchive?.content?.CareerHeading && (
                        <h1
                          className='axil-display-1 layer1'
                          style={
                            CareerArchive?.content?.TextColor?.color
                              ? { color: CareerArchive?.content?.TextColor?.color }
                              : {}
                          }
                        >
                          {CareerArchive?.content?.CareerHeading}
                        </h1>
                      )}

                      {careerdescription && CareerArchive?.content?.CareerDescription && (
                        <div
                          className='layer2 custom-color'
                          dangerouslySetInnerHTML={{
                            __html: CareerArchive?.content?.CareerDescription || '',
                          }}
                        />
                      )}
                    </div>

                    {CareerArchive?.content?.ButtonText && (
                      <button
                        onClick={handleApply}
                        className={`hoverable axil-button btn-large btn-solid`}
                      >
                        <span className='button-text hoverable px-0'>
                          {CareerArchive?.content?.ButtonText || 'Apply'}
                        </span>
                      </button>
                    )}
                  </div>

                  <div className='hero-tags section-title'>
                    {CareerArchive?.content?.JobTag?.map((tag, index) => {
                      return <Tag blok={tag} key={index} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='axil-blog-area ax-section-gap bg-color-white'>
            <div className='container'>
              <div className='blog-page-area row row--40 justify-content-center gx-30'>
                <div id='careerArea' className='col-12'>
                  <div className='axil-blog-details-area'>
                    <div className='wrapper'>
                      <div className='working__details'>
                        <div className='working__timings section-title'>
                          {CareerArchive?.content?.Hours && (
                            <ul>
                              <h3 className='title'>Working Days/Hours</h3>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: CareerArchive?.content?.Hours || '',
                                }}
                              />
                            </ul>
                          )}

                          {CareerArchive?.content?.ShowExperience && (
                            <ul>
                              <h3 className='title'>Experience Required</h3>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: CareerArchive?.content?.Days || ' ',
                                }}
                              />
                            </ul>
                          )}
                        </div>

                        <div className='share-btn'>
                          {CareerArchive?.content?.ShareButtonText && (
                            <button
                              ref={shareBtn}
                              onClick={() => setShowSocials(!showSocials)}
                              className={`hoverable axil-button btn-large btn-transparent`}
                            >
                              <span className='button-text hoverable px-0'>
                                {CareerArchive?.content?.ShareButtonText}
                              </span>
                            </button>
                          )}

                          {showSocials && (
                            <div className='share-options' ref={shareOptionsRef}>
                              <ul className='share-list'>
                                <li>
                                  <Link
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${canonicalUrl}`}
                                    target='_blank'
                                  >
                                    Facebook
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    href={`https://twitter.com/intent/tweet?url=${canonicalUrl}`}
                                    target='_blank'
                                  >
                                    Twitter
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    href={`https://www.linkedin.com/shareArticle?url=${canonicalUrl}`}
                                    target='_blank'
                                  >
                                    LinkedIn
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    href={`/`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigator.clipboard.writeText(window.location.href);
                                    }}
                                  >
                                    Copy
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='career-content'>
                {CareerArchive?.content?.body?.map((blok) => (
                   <BlogDescription
                              blok={blok}
                              key={blok._uid}
                            />
                ))}
              </div>

              {CareerArchive?.content?.ButtonText && (
                <button
                  onClick={handleApply}
                  className={`apply-btn hoverable axil-button btn-large btn-solid`}
                >
                  <span className='button-text hoverable px-0'>
                    {CareerArchive?.content?.ButtonText || 'Apply'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </main>

        {isActive && (
          <ApplyPopup
            blok={applySettings}
            isActive={isActive}
            setIsActive={setIsActive}
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
            handleClose={handleClose}
          />
        )}
      </Layout>
    </>
  );
};

export default CareersPage;

export async function getStaticPaths() {
  const paths = careerData?.data?.map((item) => ({
    params: {
      slug: item.slug,
    },
  }));

  return {
    paths,
    fallback: false, // since data is static
  };
}

// fetch single career post
export async function getStaticProps({ params }) {
  try {
    const { slug } = params;

   
    const careerItem = careerData?.data?.find(
      (item) => item.slug === slug
    );

   
    if (!careerItem) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        Slug: slug,
        CareerArchive: careerItem,
      },
    };
  } catch (error) {
    console.error("Error loading career data:", error);

    return {
      notFound: true,
    };
  }
}
