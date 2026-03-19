"client";
import fs from "fs";
import path from "path";
import Image from "next/legacy/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import { formatDateString, getAllBlogs } from "../../helpers/utilities";
import { useEffect, useState } from "react";
import {
  trimKeywords,
  RemoveSlash,
  replaceDashWithSpace,
} from "../../helpers/utilities";
import { trimArticleKeywords } from "../../helpers/utilities";
import NavigationSchema from "../../schemas/NavigationSchemas.json";
import { placeholderLight } from "../../helpers/utilities";
import Link from "next/link";
import { getImageSrc } from "../../helpers/utilities";
import { useRouter } from "next/router";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../components/layouts/Layout";
import NoticeData from "../../data/notice/Notice.json";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import newsletterModal from "@/data/newsletter/NewsletterModal.json";
import BlogContentTable from "../../components/blogs/BlogContentTable";
import Faq from "@/components/faq/Faq";
import LatestStories from "@/components/blogs/LatestStories";
import latestStoriesData from "@/data/blogs/LatestStories";
import BlogDescription from "@/components/blogs/singlePageBlok/BlogDescription";
const NewsletterModal = dynamic(
  () => import("../../components/newsletter/NewsletterModal"),
);

const BlogDetails = ({
  Slug,
  Post,
  Settings,
  GetCategory,
  locale,
}) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [tableList, setTableList] = useState([]);
  const blogslug = Slug;
  const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;
  //HowTo steps extraction from Storyblok rich text
  const extractTextFromNode = (node) => {
    if (!node) return "";
    if (node?.type === "text") return node?.text || "";
    const children = node?.content || [];
    return children.map(extractTextFromNode).join("");
  };

  const extractStepsFromRichText = (richTextDoc) => {
    if (!richTextDoc || !Array.isArray(richTextDoc?.content)) return [];
    const nodes = richTextDoc.content;
    const steps = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node?.type === "heading" && node?.attrs?.level === 2) {
        const name = extractTextFromNode(node).trim();
        let text = "";
        // find the closest following paragraph-like text
        for (let j = i + 1; j < nodes.length; j++) {
          if (
            nodes[j]?.type === "paragraph" ||
            nodes[j]?.type === "blockquote"
          ) {
            text = extractTextFromNode(nodes[j]).trim();
            if (text) break;
          } else if (nodes[j]?.type === "heading") {
            // stop at next heading
            break;
          }
        }
        if (name) {
          steps.push({ "@type": "HowToStep", name, text });
        }
      }
    }
    return steps;
  };

  const extractHowToStepsFromPost = (post) => {
    if (!post?.content?.BlogContent) return [];
    const blocks = post?.content?.BlogContent;
    let steps = [];
    blocks.forEach((blok) => {
      if (blok?.description) {
        steps = steps.concat(extractStepsFromRichText(blok.description));
      }
      if (blok?.content) {
        steps = steps.concat(extractStepsFromRichText(blok.content));
      }
      if (blok?.body) {
        steps = steps.concat(extractStepsFromRichText(blok.body));
      }
    });
    return steps.map((s, index) => ({ ...s, position: index + 1 }));
  };

  const howToStepsSSR = extractHowToStepsFromPost(Post);

  const router = useRouter();

  const catgoryList = GetCategory || [];
  const categoryList1 = [];

  catgoryList.forEach((category) => {
    category?.content?.RelatedBlogs?.forEach((blog) => {
      if (blog?.slug === blogslug && category?.slug) {
        categoryList1.push(category.slug);
      }
    });
  });

  const categoryList2 =
    Post?.content?.Categories?.map((item) => {
      if (typeof item === "string") return item;
      return item?.slug || null;
    })?.filter(Boolean) || [];

  const updatedCategory = [...new Set([...categoryList1, ...categoryList2])];

  const slugifyCategory = (value = "") =>
    value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    if (process) {
      setCurrentUrl(window.location.href);
    }
  }, []);
  const layoutSettings = {
    header: {
      style: "four",
      leftColumn: "col-lg-4 col-md-6 col-sm-6 col-8 header-left",
      rightColumn: "col-lg-8 col-md-6 col-sm-6 col-4 header-right",
      ...HeaderData,
    },
    footer: {
      // showCopyrightOnly: true,
      style: "three",
      ...FooterData,
      StickyFooter: true,
    },
    settings: { ...NoticeData },
    NewsletterModal:{...newsletterModal}

  };

  

  const trimmedFocusKeyword = trimKeywords(Post?.content?.FocusKeyword);
  const trimmedArticleKeywords = trimArticleKeywords(Post?.content?.keywords);
  const Blogschema = () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: Post?.content?.Title,
      description: Post?.content?.Excerpt,
      image: Post?.content?.FeaturedImage?.filename,
      datePublished: Post?.content?.ArticleDate,
      dateModified: Post?.published_at?.slice(0, 10),
      author: [
        {
          "@type": "Person",
          name: "Jaswinder Singh",
        },
      ],
    };
    return jsonLd;
  };
  let author = Post?.content?.Author || "Jaswinder Singh";

  return (
    <>
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
            key={locale}
            rel="alternate"
            href={`${site_url}${locale === "us" ? "/us" : ""}/blog/${Slug}`}
            hreflang={locale === "us" ? "en-US" : "en"}
          />
          <title>{`Blog - ${Post?.content?.Title}` || ""}</title>
          <meta name="og:site_name" content="RW Infotech" />
          <meta name="keywords" content={trimmedFocusKeyword || ""} />
          <meta
            name="og:url"
            content={`${site_url || ""}${locale === "us" ? "/us" : ""}/blog/${Slug}`}
          />
          <meta
            name="title"
            content={Post?.content?.Seo?.title || Post?.content?.Title || ""}
          />
          <meta
            name="description"
            content={
              Post?.content?.Seo?.description || Post?.content?.Excerpt || ""
            }
          />
          <meta
            name="og:title"
            content={Post?.content?.Seo?.og_title || Post?.content?.Title || ""}
          />
          <meta
            property="og:description"
            content={
              Post?.content?.Seo?.og_description || Post?.content?.Excerpt || ""
            }
          />
          <meta
            property="og:image"
            content={
              Post?.content?.Seo?.og_image ||
              Post?.content?.FeaturedImage?.filename ||
              "/images/meta-image.jpg"
            }
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:logo"
            content={Settings?.Logo?.filename || "/images/rwit-logos.svg"}
          />
          <meta
            name="twitter_title"
            content={
              Post?.content?.Seo?.twitter_title || Post?.content?.Title || ""
            }
          />
          <meta
            name="twitter_description"
            content={
              Post?.content?.Seo?.twitter_description ||
              Post?.content?.Excerpt ||
              ""
            }
          />
          <meta
            property="twitter:image"
            content={
              Post?.content?.Seo?.twitter_image ||
              Post?.content?.FeaturedImage?.filename ||
              "/images/meta-image.jpg"
            }
          />
          <meta name="twitter:card" content="summary_large_image" />
          <link
            rel="canonical"
            href={Post?.content?.CanonicalLink || `${site_url}/blog/${Slug}`}
          />
          <meta
            name="thumbnail"
            content={
              Post?.content?.ThumbnailImage?.filename ||
              Post?.content?.FeaturedImage?.filename ||
              "/images/meta-image.jpg"
            }
          />
          <meta name="robots" content={Post?.content?.RobotsMetaTag || "all"} />
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
                "@type": "Organization",
                "@id": "${site_url}/#organization",
                "name": "RW Infotech",
                "url": "${site_url}",
                "logo": "https://a-us.storyblok.com/f/1016184/300x157/4d7b1ba280/rwit-logo.svg",
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
                    "contactPoint": [
                       {
                         "@type": "ContactPoint",
                         "contactType": "customer service",
                         "email": "hello@rwit.io",
                         "areaServed": ["${locale && locale !== "en" ? "USA" : "UAE"}"],
                         "availableLanguage": ["English"]
                       }
                     ],
                "sameAs": [
                  "https://www.facebook.com/rwit.io/",
                  "https://www.linkedin.com/company/rwit/",
                  "https://www.instagram.com/rw_infotech/"
                ]
              }`,
            }}
          />
          {currentUrl?.includes("/blog/") && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(Blogschema()) }}
            />
          )}

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
                      "@id": `${site_url}/${locale && locale !== "en" ? locale : ""}`,
                      name: "Home",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@id": `${site_url}/${locale && locale !== "en" ? locale + "/" : ""}blog`,
                      name: "Blog",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@id": `${site_url}/${
                        locale && locale !== "en" ? locale + "/" : ""
                      }${RemoveSlash(router.asPath)}`,
                      name: replaceDashWithSpace(
                        router?.query?.slug || Slug || "",
                      ),
                    },
                  },
                ],
              }),
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
              __html: `{
              "@context": "https://schema.org/",
              "@type": "ImageObject",
              "contentUrl": "${Post?.content?.FeaturedImage?.filename}",
              "description": "${Post?.content?.Excerpt}",
              "name": "${Post?.content?.FeaturedImage?.alt}"
            }`,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{
                "@context": "https://schema.org",
                "@graph": [{
                "@type": "Article",
                "@id": "${site_url}/blog/${Slug}",
                "author": { "name": "Jaswinder Singh"},
                "headline": "${Post?.content?.Seo?.title || Post?.content?.Title || ""}",
                "datePublished": "${formatDateString(Post?.content?.ArticleDate)}",
                "dateModified": "${formatDateString(Post?.content?.ArticleDate)}",
                "wordCount": "${Post?.content?.WordCount || ""}",
                "publisher": { "@id": "${site_url}/#organization" },
                "thumbnailUrl": "${Post?.content?.FeaturedImage?.filename || ""}",
                "keywords": ${JSON.stringify(trimmedArticleKeywords)},
                "description": "${Post?.content?.Seo?.description || Post?.content?.Excerpt || ""}"
            }]}`,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: Post?.content?.Seo?.title || Post?.content?.Title,
                description:
                  Post?.content?.Seo?.description ||
                  Post?.content?.Excerpt ||
                  "",
                totalTime: `PT${Post?.content?.ReadTime ?? "10"}M`,
                step:
                  howToStepsSSR && howToStepsSSR?.length > 0
                    ? howToStepsSSR?.map((step) => ({
                        "@type": "HowToStep",
                        name: step?.name || "",
                        text: step?.text || "",
                        position: step?.position,
                        image: step?.image || undefined,
                        url: step?.url || undefined,
                      }))
                    : [],
              }),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "WebPage",
                name: Post?.content?.Seo?.title || Post?.content?.Title || "",
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: [".speak-headline", ".speak-summary"],
                },
                url: `${site_url}${locale === "us" ? "/us" : ""}/blog/${Slug}`,
              }),
            }}
          />
        </Head>

        <div style={{ position: "absolute", left: "-9999px" }}>
          <h2 className="speak-headline">
            {Post?.content?.Seo?.title || Post?.content?.Title || ""}
          </h2>
          <p className="speak-summary">
            {Post?.content?.Seo?.description || Post?.content?.Excerpt || ""}
          </p>
        </div>
        <main id="blog-slug" className="page-wrapper">
          <Breadcrumb
            title={Post?.content?.Title}
            root="Blog"
            rootUrl="/blog"
            current={Post?.content?.Title}
            showSpan={false}
          />
          <div className="axil-blog-area ax-section-gap bg-color-white">
            <div className="container">
              <div className="blog-page-area row row--40 justify-content-center gx-30">
                <BlogContentTable
                  currentUrl={currentUrl}
                  TableTitle={
                    Post?.content?.sidebarTitle
                      ? Post?.content?.sidebarTitle
                      : ""
                  }
                  tableList={tableList}
                  setTableList={setTableList}
                />
                <div id="blogArea" className="col-lg-8 col-md-12 col-12">
                  <div className="axil-blog-details-area">
                    <div className="wrapper">
                      <div className="blog-top">
                        <div className="author">
                          <div className="author-thumb">
                            <Image
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={placeholderLight}
                              width={50}
                              height={50}
                              sizes="50px"
                              src={getImageSrc(author)}
                              alt={`Blog Author: ${author || "Jaswinder Singh"}`}
                            />
                          </div>
                          <div className="info">
                            <h6>{author || "Jaswinder Singh"}</h6>
                            <ul className="blog-meta">
                              {Post?.content?.ArticleDate && (
                                <li className="post-meta-date">
                                  {formatDateString(Post?.content?.ArticleDate)}
                                </li>
                              )}
                              <li className="post-meta-reading-time">{`${Post?.content?.ReadTime} min to read`}</li>

                              {updatedCategory?.map((category, i) => {
                                if (!category) return null;

                                const categoryName = typeof category === "string" ? category : category?.slug || "";
                                const categorySlug = slugifyCategory(categoryName);

                                return (
                                  <li
                                    className="post-meta-categories"
                                    key={`cat-list-${i}`}
                                  >
                                    <Link href={`/category/${categorySlug}`}>
                                      {categoryName}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="thumbnail mb--60 mb_sm--20 mb_md--20">
                        {Post?.content?.FeaturedImage?.filename && (
                          <Image
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={placeholderLight}
                            width={850}
                            height={450}
                            className="w-100"
                            src={Post?.content?.FeaturedImage?.filename}
                            alt={
                              Post?.content?.FeaturedImage?.alt
                                ? Post?.content?.FeaturedImage?.alt
                                : "post image"
                            }
                            sizes="(max-width: 768px) 100vw, 850px"
                          />
                        )}
                      </div>

                      {Post?.content?.Title && (
                        <>
                          {Post?.content?.BlogContent?.map((nestedBlok) => (
                            <BlogDescription
                              blok={nestedBlok}
                              key={nestedBlok._uid}
                            />
                          ))}

                          {tableList && tableList?.length == 0 && (
                            <div className="blog-share d-flex flex-wrap align-items-center mb--80 mb_sm--30 mb">
                              <span className="text">Share on:</span>
                              <ul className="social-share d-flex">
                                <li>
                                  <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fab fa-facebook-f" />
                                    Facebook
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fab fa-twitter" />
                                    Twitter
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fab fa-linkedin-in" />
                                    Linkedin
                                  </a>
                                </li>
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {Post?.content?.BlogBottomContent?.map((Blok) => (
            <Faq {...Blok} key={Blok._uid} />
          ))}

          <LatestStories blok={latestStoriesData} />
        </main>
      </Layout>

      {layoutSettings?.NewsletterModal?.ShowORHide && (
  <NewsletterModal data={layoutSettings?.NewsletterModal} />
)}
    </>
  );
};

export default BlogDetails;

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "public", "allBlogData.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const paths = jsonData.map((blog) => ({
    params: {
      slug: blog.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
// fetch single blog post
// Static Props — shared across all locales

export async function getStaticProps({ params: { slug }, locale }) {
  const filePath = path.join(process.cwd(), "public", "allBlogData.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const blog = jsonData.find((b) => b.slug === slug);

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: {
      Slug: slug,
      Post: blog,
      GetCategory: [], // adjust if you store categories locally
      headerMenus: HeaderData,
      footerData: FooterData,
      Settings: {}, // or local settings JSON
      locale: locale ?? null,
    },
  };
}
