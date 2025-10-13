import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import BlogContent from '../../components/blogs/BlogContent';




const Blog = ({ blogArchive, headerMenus, footerData, settings }) => {
  const [featuredBlog, setFeaturedBlog] = useState([]);

  const allBlogs = {
    "blogArchive": {
      "Seo": {
        "title": "Our Blog",
        "description": "Latest news and insights on healthcare and technology."
      },
      "RobotsMetaTag": "all",
      "HideNavigationNotice": ""
    },
    "blogData": {
      "BlogItems": {
        "__typename": "BlogItems",
        "items": [
          {
            "__typename": "BlogItem",
            "id": 99564008061261,
            "slug": "headless-architecture-maintenance-costs",
            "created_at": "2025-10-09T08:06:59.145Z",
            "published_at": "2025-10-09T12:26:37.152Z",
            "first_published_at": "2025-10-09T12:26:37.152Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Headless Architecture Simplifies Maintenance & Reduces Costs",
              "Excerpt": "Learn how headless architecture transforms web infrastructure by simplifying maintenance, reducing developer workload, and optimizing costs, with real-world examples and tools.",
              "ArticleDate": "2025-10-09 09:00",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/3248x1680/6041b7fd6c/how-does-a-properly-designed-headless-architecture-simplify-maintenance-and-reduce-costs_.webp",
                "alt": "How Does a Properly Designed Headless Architecture Simplify Maintenance and Reduce Costs"
              },
              "ReadTime": "17",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "AI",
                  "slug": "ai"
                },
                {
                  "__typename": "Story",
                  "name": "Workflow Automation",
                  "slug": "workflow-automation"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 96417370793245,
            "slug": "headless-website-maintenance-prevent-failures",
            "created_at": "2025-09-30T10:43:17.152Z",
            "published_at": "2025-09-30T11:57:19.518Z",
            "first_published_at": "2025-09-30T11:57:19.518Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Can Headless Website Maintenance Prevent Website Failures",
              "Excerpt": "Headless websites offer flexibility and performance but come with complex maintenance needs. Proactive headless website maintenance helps prevent failures, secure APIs, optimize performance, and ensure scalability keeping your digital presence robust and future-ready.",
              "ArticleDate": "2025-09-30 11:30",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/fef9522b52/how-can-headless-website-maintenance-prevent-website-failures.webp",
                "alt": "How Can Headless Website Maintenance Prevent Website Failures"
              },
              "ReadTime": "16",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 94996481804538,
            "slug": "headless-cms-myths",
            "created_at": "2025-09-26T10:21:40.417Z",
            "published_at": "2025-09-26T12:11:20.471Z",
            "first_published_at": "2025-09-26T12:11:20.471Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "Breaking the Myths Around Headless CMS: What Businesses Really Need to Know",
              "Excerpt": "Headless CMS is often misunderstood as complex, costly, or lacking features. In this blog, RW Infotech breaks down these myths, reveals the real advantages, and shows how businesses can leverage Headless CMS for scalable, secure, and future-ready digital experiences.",
              "ArticleDate": "2025-09-26 11:30",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/85e2c18115/breaking-the-myths-around-headless-cms_-what-businesses-really-need-to-know.webp",
                "alt": "Breaking the Myths Around Headless CMS_ What Businesses Really Need to Know"
              },
              "ReadTime": "14",
              "IsFeatured": false,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 93961238339642,
            "slug": "reduce-content-duplication-errors-headless-cms",
            "created_at": "2025-09-23T12:09:15.444Z",
            "published_at": "2025-09-23T13:52:42.772Z",
            "first_published_at": "2025-09-23T13:21:30.856Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How to Reduce Content Duplication and Errors Using a Headless CMS",
              "Excerpt": "Content duplication and errors can damage brand trust, hurt SEO, and increase operational costs. This blog explores how a Headless CMS provides a single source of truth, automates updates, and ensures consistent content delivery across channels.",
              "ArticleDate": "2025-09-23 12:30",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/544c557793/how-to-reduce-content-duplication-and-errors-using-a-headless-cms.webp",
                "alt": "How to Reduce Content Duplication and Errors Using a Headless CMS"
              },
              "ReadTime": "15",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 93961238339642,
            "slug": "reduce-content-duplication-errors-headless-cms",
            "created_at": "2025-09-23T12:09:15.444Z",
            "published_at": "2025-09-23T13:52:42.772Z",
            "first_published_at": "2025-09-23T13:21:30.856Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How to Reduce Content Duplication and Errors Using a Headless CMS",
              "Excerpt": "Content duplication and errors can damage brand trust, hurt SEO, and increase operational costs. This blog explores how a Headless CMS provides a single source of truth, automates updates, and ensures consistent content delivery across channels.",
              "ArticleDate": "2025-09-23 12:30",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/544c557793/how-to-reduce-content-duplication-and-errors-using-a-headless-cms.webp",
                "alt": "How to Reduce Content Duplication and Errors Using a Headless CMS"
              },
              "ReadTime": "15",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 92108489735752,
            "slug": "headless-cms-web-development-cost-in-dubai",
            "created_at": "2025-09-18T06:30:24.241Z",
            "published_at": "2025-09-23T12:47:47.005Z",
            "first_published_at": "2025-09-18T07:55:21.828Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Much Does Headless CMS Web Development Cost in Dubai 2025?",
              "Excerpt": "In 2025, Headless CMS projects in Dubai range from AED 10K for small builds to AED 2M+ for enterprise deployments. This guide breaks down development, CMS license, and hosting costs with real AED prices and comparisons between freelancers, agencies, and enterprise firms.",
              "ArticleDate": "2025-09-18 08:30",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/a994afe572/how-much-does-headless-cms-web-development-cost-in-dubai-2025.webp",
                "alt": "How Much Does Headless CMS Web Development Cost in Dubai 2025"
              },
              "ReadTime": "13",
              "IsFeatured": false,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                },
                {
                  "__typename": "Story",
                  "name": "builder.io",
                  "slug": "builder-io"
                },
                {
                  "__typename": "Story",
                  "name": "Sanity",
                  "slug": "sanity"
                },
                {
                  "__typename": "Story",
                  "name": "Storyblok",
                  "slug": "storyblok"
                },
                {
                  "__typename": "Story",
                  "name": "Strapi",
                  "slug": "strapi"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 91458298959447,
            "slug": "how-headless-cms-speeds-up-landing-page-creation",
            "created_at": "2025-09-16T10:24:46.253Z",
            "published_at": "2025-09-16T13:05:28.213Z",
            "first_published_at": "2025-09-16T13:05:28.213Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Headless CMS Speeds Up Landing Page Creation for Ad Campaigns",
              "Excerpt": "A Headless CMS empowers marketing teams and developers to build and launch landing pages for ad campaigns at lightning speed. Learn how it streamlines workflows, improves SEO, and enhances campaign performance with RW Infotech’s expertise.",
              "ArticleDate": "2025-09-16 11:50",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/e1ee3d5e61/how-headless-cms-speeds-up-landing-page-creation-for-ad-campaigns.webp",
                "alt": "How Headless CMS Speeds Up Landing Page Creation for Ad Campaigns"
              },
              "ReadTime": "16",
              "IsFeatured": false,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "Headless seo",
                  "slug": "headless-seo"
                },
                {
                  "__typename": "Story",
                  "name": "Digital Marketing",
                  "slug": "digital-marketing"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 89981656815584,
            "slug": "ai-shopping-assistant-saleor",
            "created_at": "2025-09-12T06:16:17.918Z",
            "published_at": "2025-09-12T12:02:35.904Z",
            "first_published_at": "2025-09-12T12:02:35.904Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Smart Can a Shopping Assistant Really Get? Advanced AI Integration with Saleor's API",
              "Excerpt": "Learn how AI shopping assistants, powered by Saleor's API, transform eCommerce with personalized recommendations, natural language search, contextual support, and smart inventory management.",
              "ArticleDate": "2025-09-12 11:30",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/52d7fe9daf/how-smart-can-a-shopping-assistant-really-get_-advanced-ai-integration-with-saleor-s-api.webp",
                "alt": "How Smart Can a Shopping Assistant Really Get_ Advanced AI Integration with Saleor's API"
              },
              "ReadTime": "18",
              "IsFeatured": false,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "AI",
                  "slug": "ai"
                },
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                },
                {
                  "__typename": "Story",
                  "name": "Workflow Automation",
                  "slug": "workflow-automation"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 87202742777428,
            "slug": "sanity-groq-vs-traditional-cms-apis",
            "created_at": "2025-09-04T09:48:52.101Z",
            "published_at": "2025-09-11T13:43:46.107Z",
            "first_published_at": "2025-09-04T13:03:32.381Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Sanity's GROQ Query Language Outperforms Traditional CMS APIs",
              "Excerpt": "Sanity’s GROQ query language provides developers with unmatched control and flexibility compared to traditional CMS APIs. This blog explores how GROQ streamlines content queries and enhances efficiency in modern content management.",
              "ArticleDate": "2025-09-04 12:00",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/1624x840/8c891ae9a7/how-sanity-s-groq-query-language-outperforms-traditional-cms-apis.webp",
                "alt": "How Sanity's GROQ Query Language Outperforms Traditional CMS APIs"
              },
              "ReadTime": "18",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Sanity",
                  "slug": "sanity"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                },
                {
                  "__typename": "Story",
                  "name": "Workflow Automation",
                  "slug": "workflow-automation"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 84670759980483,
            "slug": "composable-commerce-ecommerce-development",
            "created_at": "2025-08-28T06:06:12.248Z",
            "published_at": "2025-09-11T13:43:44.543Z",
            "first_published_at": "2025-08-28T11:48:11.702Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "What is Composable Commerce and How It Changes E-commerce Development",
              "Excerpt": "Composable commerce is changing how businesses build online stores by enabling modular, API-driven, and headless solutions. With MACH principles at its core, it helps brands achieve speed, scalability, and flexibility. This blog explains the key benefits and why composable commerce is the future of digital retail.",
              "ArticleDate": "2025-08-28 06:45",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/3248x1680/f1ddac3815/what-is-composable-commerce-and-how-it-changes-e-commerce-development.webp",
                "alt": "What is Composable Commerce and How It Changes E-commerce Development"
              },
              "ReadTime": "16",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 81926942149798,
            "slug": "fusion-netlify-mcp-build-automation",
            "created_at": "2025-08-20T12:01:34.849Z",
            "published_at": "2025-09-11T13:43:42.514Z",
            "first_published_at": "2025-08-20T13:48:25.630Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Fusion + Netlify MCP Eliminates Build Scripts & Dev Backlog",
              "Excerpt": "Learn how Fusion and Netlify MCP streamline development by automating builds, reducing backlog, and enabling frictionless deployments, transforming team workflows and boosting efficiency.",
              "ArticleDate": "2025-08-20 12:03",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/51495285c0/how-fusion-netlify-mcp-eliminates-build-scripts-and-dev-backlog.webp",
                "alt": "How Fusion + Netlify MCP Eliminates Build Scripts and Dev Backlog"
              },
              "ReadTime": "12",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "Workflow Automation",
                  "slug": "workflow-automation"
                },
                {
                  "__typename": "Story",
                  "name": "builder.io",
                  "slug": "builder-io"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 79819884735191,
            "slug": "fusion-vs-publish-builderio-space-guide",
            "created_at": "2025-08-14T13:07:56.517Z",
            "published_at": "2025-09-11T13:43:41.112Z",
            "first_published_at": "2025-08-14T14:19:42.620Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "Fusion vs. Publish - Which Builder.io Space Should You Use?",
              "Excerpt": "Discover the key differences between Builder.io’s Fusion and Publish spaces. This guide explains their features, ideal scenarios, and how RW Infotech can help you choose the right space for a smooth, efficient workflow.",
              "ArticleDate": "2025-08-14 14:05",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/812x420/f3beeb70f1/fusion-vs-publish-which-builderio-space-should-you-use.jpg",
                "alt": "Fusion vs Publish - Which Builderio Space Should You Use"
              },
              "ReadTime": "15",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "builder.io",
                  "slug": "builder-io"
                },
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 77266757284207,
            "slug": "builder-io-integration-existing-website-app",
            "created_at": "2025-08-07T07:59:14.401Z",
            "published_at": "2025-09-11T13:43:39.277Z",
            "first_published_at": "2025-08-07T12:53:12.871Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How to Integrate Builder.io With Your Existing Website or App",
              "Excerpt": "Discover how to connect Builder.io with your current website or app without replatforming. This guide covers integration options using SDKs, APIs, or iframes—empowering developers and marketers to collaborate efficiently.\n\n",
              "ArticleDate": "2025-08-07 08:01",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/f080e5be59/how-to-integrate-builder-io-with-your-existing-website-or-app.webp",
                "alt": "How to Integrate Builder io With Your Existing Website or App"
              },
              "ReadTime": "15",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Migration",
                  "slug": "headless-migration"
                },
                {
                  "__typename": "Story",
                  "name": "builder.io",
                  "slug": "builder-io"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 75120149450220,
            "slug": "headless-cms-website-cost-2025",
            "created_at": "2025-08-01T06:24:40.226Z",
            "published_at": "2025-09-11T13:43:37.783Z",
            "first_published_at": "2025-08-01T14:00:51.467Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "How Much Does It Cost to Build a Website with Headless CMS in 2025?",
              "Excerpt": "Curious about the cost of building a headless CMS website in 2025? This detailed guide explains pricing for CMS platforms like Builder.io, frontend development, hosting, integrations, and more—helping you plan your project budget effectively.",
              "ArticleDate": "2025-08-01 06:53",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/7af0465207/how-much-does-it-cost-to-build-a-website-with-headless-cms-in-2025.webp",
                "alt": "How Much Does It Cost to Build a Website with Headless CMS in 2025"
              },
              "ReadTime": "13",
              "IsFeatured": false,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 72657001010183,
            "slug": "headless-cms-vs-traditional-cms-signs",
            "created_at": "2025-07-25T07:22:05.627Z",
            "published_at": "2025-09-11T13:43:35.711Z",
            "first_published_at": "2025-07-25T08:40:01.773Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "5 Signs Your Business Needs a Headless CMS Instead of a Traditional CMS",
              "Excerpt": "Traditional CMS platforms can limit scalability and flexibility. Explore 5 clear signs it’s time to adopt a headless CMS for faster performance, better frontend control, and secure multi-channel publishing.",
              "ArticleDate": "2025-07-25 07:51",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/97377d92da/5-signs-your-business-needs-a-headless-cms-instead-of-a-traditional-cms.webp",
                "alt": "5 Signs Your Business Needs a Headless CMS Instead of a Traditional CMS"
              },
              "ReadTime": "11",
              "IsFeatured": true,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Migration",
                  "slug": "headless-migration"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 69122509147088,
            "slug": "choosing-headless-cms-for-startups",
            "created_at": "2025-07-15T07:40:12.570Z",
            "published_at": "2025-09-23T09:55:32.898Z",
            "first_published_at": "2025-07-17T12:42:15.966Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "Choosing the Right Headless CMS for Startups: What You Need to Know",
              "Excerpt": "For startups, selecting the right headless CMS is more than a tech choice—it’s a strategic move that shapes scalability, speed, and cost-efficiency. This guide helps you compare top CMS platforms, avoid common pitfalls, and future-proof your content architecture.",
              "ArticleDate": "2025-07-15 07:42",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/2436x1260/f2b001a71c/how-to-choose-the-right-headless-cms-for-your-startup.webp",
                "alt": "how-to-choose-the-right-headless-cms-for-your-startup"
              },
              "ReadTime": "16",
              "IsFeatured": false,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Commerce",
                  "slug": "headless-commerce"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "web development",
                  "slug": "web-development"
                }
              ]
            }
          },
          {
            "__typename": "BlogItem",
            "id": 67709055744714,
            "slug": "supabase-edge-functions-ai-microservices",
            "created_at": "2025-07-11T07:48:51.177Z",
            "published_at": "2025-09-23T10:48:01.986Z",
            "first_published_at": "2025-07-11T13:30:33.035Z",
            "content": {
              "__typename": "BlogComponent",
              "Title": "Supabase Edge Functions + AI Serverless Microservices for Dynamic Apps",
              "Excerpt": "Supabase Edge Functions enable developers to run serverless AI microservices at the edge, ensuring low-latency, real-time performance for modern applications. This guide explores how to integrate AI APIs with Supabase, deploy sentiment analysis, and build intelligent workflows for personalized content, moderation, and search.",
              "ArticleDate": "2025-07-11 08:29",
              "Author": "Jaswinder Singh",
              "FeaturedImage": {
                "__typename": "Asset",
                "filename": "https://a-us.storyblok.com/f/1016184/3248x1680/49aeef716a/supabase-edge-functions-ai-serverless-microservices-for-dynamic-apps-min.png",
                "alt": "supabase-edge-functions-ai-serverless-microservices-for-dynamic-apps-min"
              },
              "ReadTime": "18",
              "IsFeatured": false,
              "Categories": [
                {
                  "__typename": "Story",
                  "name": "Headless CMS",
                  "slug": "headless-cms"
                },
                {
                  "__typename": "Story",
                  "name": "Headless Development",
                  "slug": "headless-development"
                },
                {
                  "__typename": "Story",
                  "name": "AI",
                  "slug": "ai"
                },
                {
                  "__typename": "Story",
                  "name": "Workflow Automation",
                  "slug": "workflow-automation"
                }
              ]
            }
          }
        ],
        "total": 166
      }
    },
    "headerMenus": [],
    "footerData": [],
    "settings": {
      "FavIcon": "/favicon.png",
      "Logo": "/images/logo.png"
    }
  }
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

  // Convert GraphQL-like BlogItems.items into the flat shape BlogContent expects
  const rawItems = allBlogs?.blogData?.BlogItems?.items || [];

  const mappedBlogItems = rawItems.map((item) => ({
    id: item.id,
    slug: item.slug,
    Title: item.content?.Title,
    Excerpt: item.content?.Excerpt,
    FeaturedImage: item.content?.FeaturedImage?.filename || item.content?.FeaturedImage,
    IsFeatured: item.content?.IsFeatured,
    ArticleDate: item.content?.ArticleDate,
    Author: item.content?.Author,
    ReadTime: item.content?.ReadTime,
    Categories: item.content?.Categories,
  }));

  useEffect(() => {
    const featuredPosts = mappedBlogItems?.filter((post) => post.IsFeatured);
    setFeaturedBlog(featuredPosts);
  }, [/* mappedBlogItems is derived synchronously from allBlogs so no need to add it to deps */]);

  const featuredPost = featuredBlog[0];
  const featuredTitle = featuredPost?.Title;

  // Filter out featured post on first page
  const filteredItems = mappedBlogItems?.filter((item) => item.Title !== featuredTitle);

  const blogItems = mappedBlogItems;

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
