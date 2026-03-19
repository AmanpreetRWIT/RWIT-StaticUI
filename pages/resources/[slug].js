'use client';
import Image from 'next/legacy/image';
import Head from 'next/head';
import { formatDateString } from '../../helpers/utilities';
import { useEffect, useState } from 'react';
import {
  trimKeywords,
  RemoveSlash,
  replaceDashWithSpace,
  placeholderLight,
  getImageSrc,
} from '../../helpers/utilities';
import NavigationSchema from '../../schemas/NavigationSchemas.json';
import { useRouter } from 'next/router';
import ResourceBreadcrumb from '../../components/breadcrumb/ResourceBreadcrumb';
import Layout from '../../components/layouts/Layout';
import BlogContentTable from '../../components/blogs/BlogContentTable';
import resourceData from '../../public/resourceData.json';
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import SettingsData from "../../data/settings/Settings.json";

const ResourceDetails = ({ Slug, Post, headerMenus, footerData, Settings, locale }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [tableList, setTableList] = useState([]);
  const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;
  const router = useRouter();

  let author = Post?.content?.Author || 'Jaswinder Singh';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const layoutSettings = {
    header: {
      style: 'four',
      leftColumn: 'col-lg-4 col-md-6 col-sm-6 col-8 header-left',
      rightColumn: 'col-lg-8 col-md-6 col-sm-6 col-4 header-right',
      ...HeaderData,
    },
    footer: {
      style: 'three',
      ...FooterData,
    },
    settings: { ...SettingsData },
    notice: {
      HideNavigationNotice: Post?.content?.HideNavigationNotice || '',
    },
  };

  const trimmedFocusKeyword = trimKeywords(Post?.content?.FocusKeyword);

  return (
    <>
      <Layout layoutSettings={layoutSettings}>
        <Head>
          <link
            rel='icon'
            type='image/x-icon'
            href={Settings?.FavIcon?.filename || '/favicon.png'}
          />
          <title>{Post?.content?.Seo?.title || `Resource - ${Post?.content?.Title}`}</title>
          <meta name='keywords' content={trimmedFocusKeyword || ''} />
          <meta name='og:url' content={`${site_url}/resources/${Slug}`} />
          <meta name='description' content={Post?.content?.Excerpt || ''} />
          <link rel='canonical' href={`${site_url}/resources/${Slug}`} />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(NavigationSchema) }}
          />
        </Head>

        <div style={{ position: 'absolute', left: '-9999px' }}>
          <h2 className='speak-headline'>
            {Post?.content?.Title}
          </h2>
          <p className='speak-summary'>
            {Post?.content?.Excerpt}
          </p>
        </div>

        <main id='resource-slug' className='page-wrapper'>
          <ResourceBreadcrumb
            title={Post?.content?.Title}
            root='Resources'
            current={Post?.content?.Title}
            showSpan={false}
          />

          <div className='axil-blog-area ax-section-gap bg-color-white'>
            <div className='container'>
              <div className='blog-page-area row row--40 justify-content-center gx-30'>

                <BlogContentTable
                  currentUrl={currentUrl}
                  TableTitle={Post?.content?.SidebarTitle || ''}
                  tableList={tableList}
                  setTableList={setTableList}
                />

                <div id='blogArea' className='col-lg-8 col-md-12 col-12'>
                  <div className='axil-blog-details-area'>
                    <div className='wrapper'>

                      {/* AUTHOR */}
                      <div className='blog-top'>
                        <div className='author'>
                          <div className='author-thumb'>
                            <Image
                              loading='lazy'
                              placeholder='blur'
                              blurDataURL={placeholderLight}
                              width={50}
                              height={50}
                              src={getImageSrc(author)}
                              alt={`Resource Author: ${author}`}
                            />
                          </div>
                          <div className='info'>
                            <h6>{author}</h6>
                            <ul className='blog-meta'>
                              {Post?.content?.ArticleDate && (
                                <li className='post-meta-date'>
                                  {formatDateString(Post?.content?.ArticleDate)}
                                </li>
                              )}
                              <li className='post-meta-reading-time'>
                                {Post?.content?.ReadTime} min to read
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* IMAGE */}
                      <div className='thumbnail mb--60 mb_sm--20 mb_md--20'>
                        {Post?.content?.FeaturedImage?.filename && (
                          <Image
                            loading='lazy'
                            placeholder='blur'
                            blurDataURL={placeholderLight}
                            width={850}
                            height={450}
                            className='w-100'
                            src={Post?.content?.FeaturedImage?.filename}
                            alt='resource image'
                          />
                        )}
                      </div>

                      {/* CONTENT */}
                      {Post?.content?.BlogContent?.map((blok, index) => (
                        <div
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: blok?.html || '',
                          }}
                        />
                      ))}

                      {/* SHARE */}
                      {tableList?.length === 0 && (
                        <div className='blog-share d-flex flex-wrap align-items-center mb--80'>
                          <span className='text'>Share on:</span>
                          <ul className='social-share d-flex'>
                            <li>
                              <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target='_blank'>
                                Facebook
                              </a>
                            </li>
                            <li>
                              <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target='_blank'>
                                Twitter
                              </a>
                            </li>
                            <li>
                              <a href={`https://www.linkedin.com/shareArticle?url=${currentUrl}`} target='_blank'>
                                Linkedin
                              </a>
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

          {/* BOTTOM CONTENT */}
          {Post?.content?.BlogBottomContent?.map((blok, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{
                __html: blok?.html || '',
              }}
            />
          ))}
        </main>
      </Layout>
    </>
  );
};

export default ResourceDetails;

export async function getStaticPaths() {
  const paths = resourceData?.data?.map((item) => ({
    params: { slug: item?.slug },
  })) || [];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug }, locale }) {
  try {
    const resourceItem = resourceData?.data?.find(
      (item) => item?.slug === slug
    );

    if (!resourceItem) {
      return { notFound: true };
    }

    return {
      props: {
        Slug: slug,
        Post: resourceItem,
        headerMenus: HeaderData,
        footerData: FooterData,
        Settings: SettingsData,
      },
    };
  } catch (error) {
    console.error("Error loading resource:", error);
    return { notFound: true };
  }
}