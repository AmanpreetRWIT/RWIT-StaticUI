import fs from "fs";
import path from "path";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import {
  trimKeywords,
  RemoveSlash,
  replaceDashWithSpace,
  placeholderLight,
} from "../../helpers/utilities";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../components/layouts/Layout";
import NoticeData from "../../data/notice/Notice.json";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import BlogSidebar from "../../components/blogs/BlogSidebar";
import BlogGridPost from "../../components/blogs/BlogGridPost";

const isCategory = "yes";
const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;

const slugifyCategory = (value = "") =>
  value
    ?.toString()
    ?.trim()
    ?.toLowerCase()
    ?.replace(/&/g, "and")
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.replace(/\s+/g, "-")
    ?.replace(/-+/g, "-");

const Blog = ({ Settings, CategoryData, categoryName }) => {
  const router = useRouter();

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

  const selectedCategoryTitle =
    categoryName ||
    replaceDashWithSpace(router?.query?.slug) ||
    "Category";

  const featuredPosts = useMemo(() => {
    return CategoryData?.filter((post) => post?.content?.IsFeatured) || [];
  }, [CategoryData]);

  const FeaturedPost = featuredPosts[0];

  const visiblePosts = useMemo(() => {
    return (CategoryData || []).filter(
      (item) => item?.slug !== FeaturedPost?.slug,
    );
  }, [CategoryData, FeaturedPost]);

  const seoSource = FeaturedPost || CategoryData?.[0] || {};
  const seoContent = seoSource?.content || {};
  const seo = seoContent?.Seo || {};

  const title = seo?.title || selectedCategoryTitle || "Category";
  const description = seo?.description || "";
  const og_title = seo?.og_title || title;
  const og_description = seo?.og_description || description;
  const og_image =
    seo?.og_image ||
    seoContent?.ThumbnailImage?.filename ||
    "/images/meta-image.jpg";
  const twitter_title = seo?.twitter_title || title;
  const twitter_description = seo?.twitter_description || description;
  const twitter_image =
    seo?.twitter_image ||
    seoContent?.ThumbnailImage?.filename ||
    "/images/meta-image.jpg";

  const {
    Name,
    RatingCount,
    RatingValue,
    FocusKeyword,
    CanonicalLink,
    ThumbnailImage,
    RobotsMetaTag,
  } = seoContent;

  const trimmedFocusKeyword = trimKeywords(FocusKeyword);
  const currentPage = router?.query?.index ? router?.query?.index[1] : 1;

  const WebpageSchema = ({
    headline = title,
    description: pageDescription = description,
    imageUrl = og_image,
  } = {}) => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      headline,
      description: pageDescription,
      url: `${site_url}/category/${router?.query?.slug}`,
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: "638",
        height: "450",
      },
    };
  };

  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(15);
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const initialPosts = visiblePosts?.slice(0, 15) || [];
    setDataArray(initialPosts);
    setOffset(15);
    setHasMore((visiblePosts?.length || 0) > 15);
  }, [visiblePosts]);

  const loadMore = () => {
    if (!hasMore) return;

    const newElements = visiblePosts?.slice(offset, offset + 15) || [];
    const nextOffset = offset + 15;

    setDataArray((prev) => [...prev, ...newElements]);
    setOffset(nextOffset);

    if (nextOffset >= visiblePosts.length) {
      setHasMore(false);
    }
  };

  return (
    <Layout layoutSettings={layoutSettings}>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href={
            Settings?.FavIcon?.filename
              ? Settings?.FavIcon?.filename
              : "/favicon.png"
          }
          sizes="any"
        />
        <link
          key="en"
          rel="alternate"
          href={`${site_url}/category/${router?.query?.slug}`}
          hrefLang="en"
        />
        <title>{title}</title>
        <meta name="og:site_name" content="RW Infotech" />
        <meta name="description" content={description} />
        <meta name="keywords" content={trimmedFocusKeyword || ""} />
        <meta
          name="og:url"
          content={`${site_url}/category/${router?.query?.slug}`}
        />
        <meta name="og:title" content={og_title} />
        <meta property="og:description" content={og_description} />
        <meta property="og:image" content={og_image} />
        <meta property="og:type" content="website" />
        <meta
          property="og:logo"
          content={Settings?.Logo?.filename || "/images/rwit-logos.svg"}
        />
        <meta name="twitter_title" content={twitter_title} />
        <meta name="twitter_description" content={twitter_description} />
        <meta property="twitter:image" content={twitter_image} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={CanonicalLink || `${site_url}/category/${router?.query?.slug}`}
        />
        <meta
          name="thumbnail"
          content={ThumbnailImage?.filename || "/images/meta-image.jpg"}
        />
        <meta name="robots" content={RobotsMetaTag || "all"} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(NavigationSchema),
          }}
        />
        <script
          type="application/ld+json"
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@id": `${site_url}/`,
                    name: "Home",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": `${site_url}/${RemoveSlash(router?.asPath)}`,
                    name: selectedCategoryTitle,
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WebpageSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org/",
              "@type": "ImageObject",
              "contentUrl": "${ThumbnailImage?.filename || ""}",
              "description": "${description}",
              "name": "${ThumbnailImage?.alt || ""}"
            }`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{ "@context" : "http://schema.org",
              "@type" : "Organization",
              "url" : "${site_url}/blog",
              "name" : "RW Infotech",
              "description" : "${description}",
              "logo":"https://a-us.storyblok.com/f/1016184/300x157/4d7b1ba280/rwit-logo.svg",
              "founder": {
                "@type": "Person",
                "@id": "https://www.rwit.io/#founder",
                "name": "Jaswinder Singh",
                "jobTitle": "Founder & CEO",
                "worksFor": {
                  "@type": "Organization",
                  "name": "RW Infotech",
                  "url": "https://www.rwit.io/"
                },
                "sameAs": [
                  "https://in.linkedin.com/in/jas-narula/"
                ]
              },
              "sameAs" : [
                "https://www.facebook.com/rwit.io/",
                "https://www.linkedin.com/company/rwit/",
                "https://www.instagram.com/rw_infotech/"
              ],
              "aggregateRating" : {
                "@type" : "AggregateRating",
                "ratingValue" : "5",
                "bestRating" : "5",
                "ratingCount" : "${RatingCount || "5"}"
              },
              "review" : {
                "@type" : "Review",
                "author" : {
                  "@type" : "Person",
                  "name" : "${Name || "jaswinder singh"}"
                },
                "reviewRating" : {
                  "@type" : "Rating",
                  "ratingValue": "${RatingValue || "5"}"
                }
              }
            }`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebPage",
              name: title,
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: [".speak-headline", ".speak-summary"],
              },
              url: `${site_url}/category/${router?.query?.slug}`,
            }),
          }}
        />
      </Head>

      <div style={{ position: "absolute", left: "-9999px" }}>
        <h2 className="speak-headline">{title}</h2>
        <p className="speak-summary">{description}</p>
      </div>

      <main id="category-blog" className="page-wrapper">
        <Breadcrumb
          current={router?.query?.slug?.replace(/-/g, " ")}
          title={router?.query?.slug?.replace(/-/g, " ")}
          isCategory={isCategory}
          showSearch={true}
          showBreadcrumb={false}
          alignment="center"
        />

        <div
          className={`axil-blog-area bg-color-white ax-section-gap ${
            currentPage == 1 ? "" : "pt-0"
          }`}
        >
          <div className="container">
            <div className="row row--40 justify-content-center">
              <div className="col-lg-8 col-md-12 col-12">
                {FeaturedPost && dataArray?.length > 0 && (
                  <div className="mt_md--30 mt_sm--30 mt_lg--50">
                    <div className="axil-blog-list">
                      <Link href={`/blog/${FeaturedPost?.slug}`} legacyBehavior>
                        <a className="text-decoration-none">
                          <h3 className="title">
                            {FeaturedPost?.content?.Title}
                          </h3>
                          <div className="content">
                            {FeaturedPost?.content?.Excerpt && (
                              <p>{FeaturedPost?.content?.Excerpt}</p>
                            )}
                          </div>
                          <div className="thumbnail">
                            {FeaturedPost?.content?.FeaturedImage?.filename && (
                              <Image
                                width={850}
                                height={450}
                                className="w-100"
                                src={
                                  FeaturedPost?.content?.FeaturedImage?.filename
                                }
                                alt={
                                  FeaturedPost?.content?.FeaturedImage?.alt ||
                                  "blog-post"
                                }
                                loading="lazy"
                                placeholder="blur"
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

              {dataArray.length >= 1 && FeaturedPost ? (
                <div className="col-lg-4 col-md-12 col-12 mt_md--40 mt_sm--40">
                  <BlogSidebar recentPost={dataArray?.slice(0, 5)} />
                </div>
              ) : null}
            </div>

            <InfiniteScroll
              dataLength={dataArray.length}
              next={loadMore}
              hasMore={hasMore}
              pullDownToRefreshThreshold={-500}
              loader={
                <p style={{ textAlign: "center" }}>
                  {hasMore && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                      width="200"
                      height="80"
                      style={{
                        shapeRendering: "auto",
                        background: "rgb(255, 255, 255)",
                      }}
                    >
                      <g>
                        <circle
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray="50.26548245743669 50.26548245743669"
                          stroke="#1b90dc"
                          strokeWidth="8"
                          r="32"
                          cy="50"
                          cx="50"
                        >
                          <animateTransform
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                            dur="1s"
                            repeatCount="indefinite"
                            type="rotate"
                            attributeName="transform"
                          />
                        </circle>
                      </g>
                    </svg>
                  )}
                </p>
              }
            >
              {dataArray.length > 0 ? (
                <BlogGridPost posts={dataArray} />
              ) : FeaturedPost ? (
                <BlogGridPost posts={[FeaturedPost]} />
              ) : null}
            </InfiniteScroll>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;

export async function getServerSideProps({ params }) {
  try {
    const jsonFilePath = path.join(process.cwd(), "public", "allBlogData.json");
    const jsonData = fs.readFileSync(jsonFilePath, "utf8");
    const allBlogs = JSON.parse(jsonData);

    const categorySlug = params?.slug || "";

    const CategoryData = (allBlogs || []).filter((item) => {
      const categories = item?.content?.Categories || [];
      return categories.some(
        (category) => slugifyCategory(category) === categorySlug,
      );
    });

    if (!CategoryData.length) {
      return {
        notFound: true,
      };
    }

    const matchedCategory =
      CategoryData?.[0]?.content?.Categories?.find(
        (category) => slugifyCategory(category) === categorySlug,
      ) || replaceDashWithSpace(categorySlug);

    return {
      props: {
        CategoryData,
        Settings: null,
        categoryName: matchedCategory,
      },
    };
  } catch (error) {
    console.error("Error fetching category data from local JSON:", error);
    return {
      notFound: true,
    };
  }
}