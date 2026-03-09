import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import CategorySlider from "../components/categorySlider/CategorySlider";
import blogsData from "../data/blogs/blog-by-category.json";
import { trimKeywords } from "../helpers/utilities";
import categorySliderData from "../data/categorySlider/CategorySlider.json";
import  NavigationSchema from "../schemas/NavigationSchemas.json";
import HeaderData from "../data/layouts/Header.json";
import FooterData from "../data/layouts/Footer.json";
import LatestStories from "../components/blogs/LatestStories";
import latestStories from "../data/blogs/LatestStories.json";
import NoticeData from "../data/notice/Notice.json";

const site_url = process.env.NEXT_PUBLIC_RWIT_LIVE_URL || "https://rwit.io";

const Blogs = () => {
  const {
    AllBlogsArchive,
    BlogData,
    GetCategory,
    MainMenu,
    Footer,
    Settings,
    PageData,
  } = blogsData;

  // const layoutSettings = {
  //   header: {
  //     style: "four",
  //     leftColumn: "col-lg-4 col-md-6 col-sm-6 col-8 header-left",
  //     rightColumn: "col-lg-8 col-md-6 col-sm-6 col-4 header-right",
  //     headerMenus: MainMenu.content,
  //   },
  //   footer: {
  //     style: "three",
  //     footerData: Footer.content,
  //   },
  //   settings: Settings,
  //   notice: {
  //     HideNavigationNotice: AllBlogsArchive.HideNavigationNotice || "",
  //   },
  // };

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
    settings: {...NoticeData},
  };

  const {
    title,
    description,
    og_title,
    og_description,
    og_image,
    twitter_title,
    twitter_description,
    twitter_image,
  } = AllBlogsArchive?.Seo;

  const WebpageSchema = (props = {}) => {
    const {
      headline = title,
      description: desc = description,
      imageUrl = og_image,
    } = props;
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      headline,
      description: desc,
      url: `${site_url}/blog`,
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: "638",
        height: "450",
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
  } = AllBlogsArchive;

  const trimmedFocusKeyword = trimKeywords(FocusKeyword);
  const Blog = BlogData?.BlogItems;
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { CategoriesToShow, CategoryTabColor } = PageData.content;

  const handleActiveTab = (id) => {
    const category = document.getElementById(`slider-${id}`);
    const tabs = document.querySelectorAll("[data-tab-id]");
    category?.scrollIntoView({ behavior: "smooth" });
    tabs?.forEach((tab) => {
      tab.classList.toggle(
        "categoryTab__active",
        tab.getAttribute("data-tab-id") === id
      );
    });
  };

  useEffect(() => {
    const categoriesData = GetCategory?.map((category) => ({
      slug: category?.slug,
      full_slug: category?.full_slug,
      blogs: Blog?.items?.filter((blog) =>
        blog?.content?.Categories?.some((cat) => cat?.slug === category?.slug)
      ),
    }));

    const filterCategories = CategoriesToShow?.map((item) =>
      categoriesData.find((category) => category.slug === item?.slug)
    );

    setFilteredCategories(filterCategories);
  }, [Blog?.items,CategoriesToShow,GetCategory]);

  useEffect(() => {
    const tabs = document.querySelectorAll("[data-slider-id]");
    const tabContainer = document.querySelector(".categoryTab-wrapper");
    const categorySliders = document.querySelectorAll(".sliderBox");
    let currentSection = categorySliders[0]?.id;

    const handleScroll = () => {
      if (!tabContainer) return;
      const tabsContainerTop = tabContainer.getBoundingClientRect().top;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      categorySliders?.forEach((slider) => {
        const sliderPosition =
          slider.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= sliderPosition) {
          currentSection = slider.id;
        }
      });
      tabs?.forEach((tab) => {
        tab.classList.toggle(
          "categoryTab__active",
          tab.getAttribute("data-slider-id") === currentSection
        );
      });

      tabContainer.style.backgroundColor =
        tabsContainerTop <= 80 ? CategoryTabColor?.color || "#f3f3f3" : "";
      tabContainer.classList.toggle(
        "categoryTab-bottom-shadow",
        tabsContainerTop <= 80
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <Layout layoutSettings={layoutSettings}>
    <div>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href={Settings?.FavIcon?.filename || "/favicon.png"}
        />
        <title>{title || "Blog"}</title>
        <meta name="description" content={description || ""} />
        <meta name="keywords" content={trimmedFocusKeyword || ""} />
        <meta property="og:title" content={og_title || title || ""} />
        <meta
          property="og:description"
          content={og_description || description || ""}
        />
        <meta
          property="og:image"
          content={og_image || ThumbnailImage?.filename}
        />
        <link
          rel="canonical"
          href={CanonicalLink || `${site_url}/blog-by-category`}
        />
        <meta name="robots" content={RobotsMetaTag || "all"} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NavigationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WebpageSchema()) }}
        />
      </Head>

      <main id="all-blogs" className="page-wrapper blog-page">
        <Breadcrumb
          alignment="center"
          showSearch={true}
          showBreadcrumb={true}
          current="Blog"
          title="Articles & Resources"
          description="Insights, tips, and strategies from our headless commerce experts."
        />
       <LatestStories data={latestStories}/>
        <div className="axil-blog-area bg-color-white ax-section-gap all-blogs-categories">
          <div id="allBlogArea">
            <div className="categoryTab-wrapper">
              <div className="axil-blog-area container ax-section-gap pt-0 categoryTab-container">
                {filteredCategories?.length > 0 &&
                  CategoriesToShow?.map(
                    ({ slug, name }, index) =>
                      index < 4 && (
                        <div
                          className="categoryTab__tab"
                          key={index}
                          onClick={() => handleActiveTab(slug)}
                          data-slider-id={`slider-${slug}`}
                          data-tab-id={slug}
                          id={`tab-${slug}`}
                        >
                          {name}
                        </div>
                      )
                  )}
              </div>
            </div>

            {filteredCategories.map(
              ({ blogs, full_slug, slug }, index) =>
                index < 4 && (
                  <div
                    id={`slider-${slug}`}
                    className={`sliderBox ${slug}`}
                    key={index}
                  >
                    <CategorySlider blogs={categorySliderData} />
                  </div>
                )
            )}
          </div>
        </div>
      </main>
    </div>
    </Layout>
  );
};

export default Blogs;
