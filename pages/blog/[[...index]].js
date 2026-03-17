import fs from "fs";
import path from "path";

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Layout from '../../components/layouts/Layout';
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import NoticeData from "../../data/notice/Notice.json";
import Pagination from '../../components/pagination/Pagination';
import BlogSidebar from '../../components/blogs/BlogSidebar';
import BlogGridPost from '../../components/blogs/BlogGridPost';
import { trimKeywords, placeholderLight } from '../../helpers/utilities';
import NavigationSchema from '../../schemas/NavigationSchemas.json';

// Constants
const POST_PER_PAGE = 15;

const Blog = ({ BlogArchive, BlogData, headerMenus, footerData, Settings }) => {
  const router = useRouter();
  const path = router?.asPath || '/blog';
  const currentPage = router?.query?.index ? router?.query?.index[1] : 1;
  const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;

  // State
  const [featuredBlog, setFeaturedBlog] = useState([]);

  // Layout settings
  const layoutSettings = {
    header: {
      style: 'four',
      leftColumn: 'col-lg-4 col-md-6 col-sm-6 col-8 header-left',
      rightColumn: 'col-lg-8 col-md-6 col-sm-6 col-4 header-right',
      ...HeaderData, // Empty for demo
    },
    footer: {
      style: "three",
      ...FooterData, // Empty for demo
      StickyFooter: true,
    },
    settings: {...NoticeData},
  };

  // SEO data
  const {
    title,
    description,
    og_title,
    og_description,
    og_image,
    twitter_title,
    twitter_description,
    twitter_image,
  } = BlogArchive?.Seo || {};
  const WebpageSchema = ({
    headline = BlogArchive?.Seo?.title,
    description = BlogArchive?.Seo?.description,
    imageUrl = BlogArchive?.Seo?.og_image,
  } = {}) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      headline: headline,
      description: description,
      url: `${site_url}/blog`,
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: '638',
        height: '450',
      },
    };
  };
  const {
    Name,
    RatingCount,
    RatingValue,
    FocusKeyword,
    CanonicalLink,
    ThumbnailImage,
    RobotsMetaTag,
  } = BlogArchive || {};

  const trimmedFocusKeyword = trimKeywords(FocusKeyword);
  const blogItems = BlogData?.BlogItems;

  // Scroll to top after route change completes (Safari-safe: avoids scroll/navigation conflict)
  useEffect(() => {
    const onRouteChangeComplete = () => window.scrollTo(0, 0);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => router.events.off('routeChangeComplete', onRouteChangeComplete);
  }, [router.events]);

  // Get featured blog posts
  useEffect(() => {
    const getFeatured = () => {
      const featuredPosts = blogItems?.items.filter((post) => post?.content?.IsFeatured);
      setFeaturedBlog(featuredPosts);
    };
    getFeatured();
  }, [blogItems]);

  const featuredPost = featuredBlog[0];
  const featuredTitle = featuredPost?.content?.Title;

  // Filter blog items
  const filteredItems = blogItems?.items?.filter((item) =>
    currentPage == 1 ? item?.content?.Title !== featuredTitle : item
  );

  return (
    <Layout layoutSettings={layoutSettings}>
      <Head>
        <link
          rel='icon'
          type='image/x-icon'
          href={Settings?.FavIcon?.filename || '/favicon.png'}
          sizes='any'
        />
        <link key={'en'} rel='alternate' href={`${site_url}/blog`} hreflang={'en'} />
        <title>{title || 'Blog'}</title>
        <meta name='og:site_name' content='RW Infotech' />
        <meta name='description' content={description || ''} />
        <meta name='keywords' content={trimmedFocusKeyword || ''} />
        <meta name='og:title' content={og_title || title || ''} />
        <meta property='og:type' content='article' />
        <meta property='og:logo' content={Settings?.Logo?.filename || '/images/rwit-logos.svg'} />
        <meta name='og:url' content={`${site_url || ''}/blog`} />
        <meta property='og:description' content={og_description || description || ''} />
        <meta
          property='og:image'
          content={og_image || ThumbnailImage?.filename || '/images/meta-image.jpg'}
        />
        <meta name='twitter_title' content={twitter_title || title || ''} />
        <meta name='twitter_description' content={twitter_description || description || ''} />
        <meta
          property='twitter:image'
          content={twitter_image || ThumbnailImage?.filename || '/images/meta-image.jpg'}
        />
        <meta name='twitter:card' content='summary_large_image' />
        <link rel='canonical' href={CanonicalLink || `${site_url}${path}`} />
        <meta name='thumbnail' content={ThumbnailImage?.filename || '/images/meta-image.jpg'} />
        <meta name='robots' content={RobotsMetaTag || 'all'} />

        {/* Schema markup */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(NavigationSchema),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "${site_url}/",
              "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "${site_url}/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
              }
          }`,
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@id': `${site_url}/`,
                    name: 'Home',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@id': `${site_url}/blog`,
                    name: 'Blog',
                  },
                },
              ],
            }),
          }}
        />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WebpageSchema()),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org/",
              "@type": "ImageObject",
              "contentUrl": "${ThumbnailImage?.filename}",
              "description": "${description}",
              "name": "${ThumbnailImage?.alt}"
            }`,
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `{ "@context" : "http://schema.org",
            "@type" : "Organization",
             "url" : "${site_url}/blog",

             "name" : "${title || ''}",
             "description" : "${description || ''}",

             "logo":"https://a-us.storyblok.com/f/1016184/300x157/4d7b1ba280/rwit-logo.svg",

           "sameAs" : [ "https://www.facebook.com/rwit.io/",
           "https://www.linkedin.com/company/rwit/",
                 "https://www.instagram.com/rw_infotech/ "] ,

            "aggregateRating" : {
            "@type" : "AggregateRating",
            "ratingValue" : "5",
            "bestRating" : "5",
            "ratingCount" : "${RatingCount || '5'}"
                   },
          "review" : {
          "@type" : "Review",
                "author" : {
              "@type" : "Person",
                 "name" : "${Name || 'jaswinder singh'}"
                 },
           "reviewRating" : {
           "@type" : "Rating",
          "ratingValue": "${RatingValue || '5'}"
            }}}`,
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'WebPage',
              name: title,
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['.speak-headline', '.speak-summary'],
              },
              url: `${site_url}/blog`,
            }),
          }}
        />
      </Head>
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <h2 className='speak-headline'>{title}</h2>
        <p className='speak-summary'>{description}</p>
      </div>

      <main id='all-blog' className='page-wrapper blog-page'>
        <Breadcrumb
          alignment='center'
          showBreadcrumb={true}
          showSearch={true}
          current='Blog'
          title='Articles & Resources'
          description='Insights, tips, and strategies from our headless commerce experts.'
        />
        <div className={`axil-blog-area bg-color-white ax-section-gap `}>
          <div className='container'>
            {currentPage == 1 && (
              <div className='row row--40 justify-content-center'>
                <div className='col-lg-8 col-md-12 col-12'>
                  {featuredPost && (
                    <div className={'mt_md--30 mt_sm--30 mt_lg--50'}>
                      <div className='axil-blog-list'>
                        <Link href={`/blog/${featuredPost?.slug}`} legacyBehavior>
                          <a className='text-decoration-none'>
                            <h2 className='title'>{featuredPost?.content?.Title}</h2>
                            {featuredPost?.content?.Excerpt && (
                              <div className='content'>
                                <p>{featuredPost?.content?.Excerpt}</p>
                              </div>
                            )}
                            <div className='thumbnail'>
                              {featuredPost?.content?.FeaturedImage?.filename && (
                                <Image
                                  width={850}
                                  height={450}
                                  className='w-100'
                                  src={featuredPost?.content?.FeaturedImage?.filename}
                                  alt={featuredPost?.content?.FeaturedImage?.alt || 'blog-post'}
                                  loading='lazy'
                                  placeholder='blur'
                                  blurDataURL={placeholderLight}
                                />
                              )}
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className='col-lg-4 col-md-12 col-12 mt_md--40 mt_sm--30'>
                  {filteredItems && <BlogSidebar recentPost={filteredItems.slice(0, 5)} />}
                </div>
              </div>
            )}

            {filteredItems && <BlogGridPost posts={filteredItems} />}

            <Pagination
              postPerpage={POST_PER_PAGE}
              totalPages={blogItems?.total}
              currentpage={currentPage}
              handleClick={() => {}}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps({ params }) {
  try {
    const pageIndex = params?.index
      ? params?.index?.length === 2
        ? parseInt(params?.index[1])
        : 1
      : 1;

    const filePath = path.join(process.cwd(), "public/blogData.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const allBlogs = jsonData?.stories || [];

    const isFirstPage = pageIndex === 1;
    const perPage = isFirstPage ? 16 : 15;

    const start = (pageIndex - 1) * perPage;
    const end = start + perPage;

    const paginatedBlogs = allBlogs.slice(start, end);

    // 🔥 Adapt to your existing structure
    const BlogData = {
      BlogItems: {
        items: paginatedBlogs,
        total: allBlogs.length,
      },
    };

    return {
      props: {
        BlogData,
        headerMenus: HeaderData || null,
        footerData: FooterData || null,
        Settings: null,
        BlogArchive: null,
        pageIndex,
      },
    };
  } catch (error) {
    console.error("Error reading JSON:", error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "public/blogData.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const totalItems = jsonData?.stories?.length || 0;
  const pageCounts = Math.ceil(totalItems / POST_PER_PAGE);

  const pagePaths = [
    { params: { index: [] } },
    ...Array.from({ length: pageCounts }, (_, i) => ({
      params: { index: ["page", `${i + 1}`] },
    })),
  ];

  return {
    paths: pagePaths,
    fallback: false,
  };
}
