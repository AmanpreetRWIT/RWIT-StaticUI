"client";
import Image from "next/legacy/image";
import dynamic from "next/dynamic";
import { formatDateString, getAllBlogs } from "../../helpers/utilities";
import { useEffect, useState } from "react";
import faqData from "../../data/faq/Faq.json";

import {
  trimKeywords,
  RemoveSlash,
  replaceDashWithSpace,
} from "../../helpers/utilities";
import { trimArticleKeywords } from "../../helpers/utilities";
import { placeholderLight } from "../../helpers/utilities";
import Link from "next/link";
import { getImageSrc } from "../../helpers/utilities";
import { useRouter } from "next/router";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../components/layouts/Layout";
import BlogContentTable from "../../components/blogs/BlogContentTable";
import { Post } from "../../data/blogs/blogPost";
import { GetCategory } from "../../data/blogs/category";
import HeaderData from "../../data/layouts/Header.json";
import FooterData from "../../data/layouts/Footer.json";
import Faq from "@/components/faq/Faq";
import LatestStories from "@/components/blogs/LatestStories";
import latestStoriesData from "../../data/blogs/LatestStories.json";
import NewsletterModal from "@/components/newsletter/NewsletterModal";
import newsletterModal from "../../data/newsletter/NewsletterModal.json";
import NoticeData from "../../data/notice/Notice.json";

const BlogDetails = ({ Slug }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [tableList, setTableList] = useState([]);
  const [blogslug, setBlogSlug] = useState(Slug);
  const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL;

  const extractTextFromNode = (node) => {
    if (!node) return "";
    if (node?.type === "text") return node?.text || "";
    const children = node?.content || [];
    return children.map(extractTextFromNode).join("");
  };
  const catgoryList = GetCategory;
  const categoryList1 = [];

  catgoryList?.forEach((category) => {
    category?.content?.RelatedBlogs?.forEach((blog, i) => {
      if (blog?.slug === blogslug) {
        categoryList1?.push(category?.slug);
      }
    });
  });

  const categoryList2 = Post?.content?.Categories?.map((item) => {
    return item?.slug;
  });

  const updatedCategory = [
    ...new Set([...categoryList1, ...(categoryList2 || [])]),
  ];

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
      ...HeaderData, // Empty for demo
    },
    footer: {
      style: "three",
      ...FooterData, // Empty for demo
      StickyFooter: true,
    },
    settings: {...NoticeData},
  };
  let author = Post?.content?.Author || "Jaswinder Singh";

  return (
    <>
      <Layout layoutSettings={layoutSettings}>
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
                              alt={`Blog Author: ${
                                author || "Jaswinder Singh"
                              }`}
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

                              {updatedCategory &&
                                updatedCategory?.map((category, i) => {
                                  return (
                                    <li
                                      className="post-meta-categories"
                                      key={`cat-list-${i}`}
                                    >
                                      <Link href={`/category/${category}`}>
                                        {category.replace(/-/g, " ")}
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
                          {/* {Post?.content?.BlogContent?.map((nestedBlok) => (
                            <StoryblokComponent
                              blok={nestedBlok}
                              key={nestedBlok._uid}
                            />
                          ))} */}
                          <h2 id="Understanding-the-Core:-What-Exactly-is-a-Headless-CMS?">
                            Understanding the Core: What Exactly is a Headless
                            CMS?
                          </h2>
                          <p>
                            One of the most pervasive myths is that Headless CMS
                            introduces an insurmountable layer of complexity,
                            making it suitable only for large enterprises with
                            dedicated development teams. The reality is far more
                            nuanced. One of the most pervasive myths is that
                            Headless CMS introduces an insurmountable layer of
                            complexity, making it suitable only for large
                            enterprises with dedicated development teams. The
                            reality is far more nuanced. One of the most
                            pervasive myths is that Headless CMS introduces an
                            insurmountable layer of complexity, making it
                            suitable only for large enterprises with dedicated
                            development teams. The reality is far more nuanced.
                            One of the most pervasive myths is that Headless CMS
                            introduces an insurmountable layer of complexity,
                            making it suitable only for large enterprises with
                            dedicated development teams. The reality is far more
                            nuanced. One of the most pervasive myths is that
                            Headless CMS introduces an insurmountable layer of
                            complexity, making it suitable only for large
                            enterprises with dedicated development teams. The
                            reality is far more nuanced. One of the most
                            pervasive myths is that Headless CMS introduces an
                            insurmountable layer of complexity, making it
                            suitable only for large enterprises with dedicated
                            development teams. The reality is far more nuanced.
                          </p>
                          <h2 id="Myth-1:-Headless-CMS-is-Too-Complex-and-Only-for-Tech-Savvy-Enterprises">
                            Myth 1: Headless CMS is Too Complex and Only for
                            Tech-Savvy Enterprises
                          </h2>
                          <p>
                            One of the most pervasive myths is that Headless CMS
                            introduces an insurmountable layer of complexity,
                            making it suitable only for large enterprises with
                            dedicated development teams. The reality is far more
                            nuanced. One of the most pervasive myths is that
                            Headless CMS introduces an insurmountable layer of
                            complexity, making it suitable only for large
                            enterprises with dedicated development teams. The
                            reality is far more nuanced. One of the most
                            pervasive myths is that Headless CMS introduces an
                            insurmountable layer of complexity, making it
                            suitable only for large enterprises with dedicated
                            development teams. The reality is far more nuanced.
                            One of the most pervasive myths is that Headless CMS
                            introduces an insurmountable layer of complexity,
                            making it suitable only for large enterprises with
                            dedicated development teams. The reality is far more
                            nuanced.
                          </p>
                          <h2 id="Myth-2:-Headless-CMS-is-More-Expensive-Than-Traditional-Solutions">
                            Myth 2: Headless CMS is More Expensive Than
                            Traditional Solutions
                          </h2>
                          <p>
                            One of the most pervasive myths is that Headless CMS
                            introduces an insurmountable layer of complexity,
                            making it suitable only for large enterprises with
                            dedicated development teams. The reality is far more
                            nuanced. One of the most pervasive myths is that
                            Headless CMS introduces an insurmountable layer of
                            complexity, making it suitable only for large
                            enterprises with dedicated development teams. The
                            reality is far more nuanced. One of the most
                            pervasive myths is that Headless CMS introduces an
                            insurmountable layer of complexity, making it
                            suitable only for large enterprises with dedicated
                            development teams. The reality is far more nuanced.
                            One of the most pervasive myths is that Headless CMS
                            introduces an insurmountable layer of complexity,
                            making it suitable only for large enterprises with
                            dedicated development teams. The reality is far more
                            nuanced.
                          </p>
                          <h2 id="Myth-3:-Headless-CMS-is-Less-Secure">
                            Myth 3: Headless CMS is Less Secure
                          </h2>
                          <p>
                            One of the most pervasive myths is that Headless CMS
                            introduces an insurmountable layer of complexity,
                            making it suitable only for large enterprises with
                            dedicated development teams. The reality is far more
                            nuanced. One of the most pervasive myths is that
                            Headless CMS introduces an insurmountable layer of
                            complexity, making it suitable only for large
                            enterprises with dedicated development teams. The
                            reality is far more nuanced. One of the most
                            pervasive myths is that Headless CMS introduces an
                            insurmountable layer of complexity, making it
                            suitable only for large enterprises with dedicated
                            development teams. The reality is far more nuanced.
                          </p>

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
          <Faq {...faqData} />
          <LatestStories data={latestStoriesData} />
        </main>
      </Layout>
      <NewsletterModal data={newsletterModal} />
    </>
  );
};

export default BlogDetails;
