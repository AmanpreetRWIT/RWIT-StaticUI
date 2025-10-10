import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import blogData from '../../data/blogs/blogData';
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import BlogContent from '../../components/blogs/BlogContent';

const POST_PER_PAGE = 15;

const Blog = ({ blogArchive, headerMenus, footerData, settings }) => {
  const [featuredBlog, setFeaturedBlog] = useState([]);

  const layoutSettings = {
    header: {
      style: "four",
      leftColumn: "col-lg-4 col-md-6 col-sm-6 col-8 header-left",
      rightColumn: "col-lg-8 col-md-6 col-sm-6 col-4 header-right",
      headerMenus,
    },
    footer: {
      style: "three",
      footerData,
    },
    settings,
    notice: {
      HideNavigationNotice: blogArchive?.HideNavigationNotice || "",
    },
  };

  const blogItems = blogData?.BlogItems || [];

  useEffect(() => {
    const featuredPosts = blogItems?.filter((post) => post.IsFeatured);
    setFeaturedBlog(featuredPosts);
  }, [blogItems]);

  const featuredPost = featuredBlog[0];
  const featuredTitle = featuredPost?.Title;

  // Filter out featured post on first page
  const filteredItems = blogItems?.filter(
    (item) => item.Title !== featuredTitle
  );

  return (
    <>
    {/* // <Layout layoutSettings={layoutSettings}> */}
      <Head>
        <title>{blogArchive?.Seo?.title || "Blog"}</title>
        <meta
          name="description"
          content={blogArchive?.Seo?.description || ""}
        />
        <meta name="robots" content={blogArchive?.RobotsMetaTag || "all"} />
      </Head>

      <main id="all-blog" className="page-wrapper blog-page">
        <Breadcrumb
          alignment="center"
          showBreadcrumb
          showSearch
          current="Blog"
          title="Articles & Resources"
          description="Insights, tips, and strategies from our headless commerce experts."
        />

        <BlogContent
          featuredPost={featuredPost}
          filteredItems={filteredItems}
          blogItems={blogItems}
        />
      </main>
      {/* </Layout> */}
    </>

  );
};

export default Blog;
