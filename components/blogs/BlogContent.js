import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import BlogSidebar from './BlogSidebar';
import BlogGridPost from './BlogGridPost';
import Pagination from '../pagination/Pagination';
import { placeholderLight } from '../../helpers/utilities';

const POST_PER_PAGE = 15;

const BlogContent = ({ featuredPost, filteredItems, blogItems }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * POST_PER_PAGE;
    const end = start + POST_PER_PAGE;
    return filteredItems?.slice(start, end) || [];
  }, [filteredItems, currentPage]);

  const totalPages = Math.max(1, Math.ceil((filteredItems?.length || 0) / POST_PER_PAGE));

  const handlePageClick = (page) => {
    setCurrentPage(Number(page) || 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="axil-blog-area bg-color-white ax-section-gap">
      <div className="container">
        {featuredPost && (
          <div className="row row--40 justify-content-center">
            <div className="col-lg-8 col-md-12 col-12">
              <div className={'mt_md--30 mt_sm--30 mt_lg--50'}>
                <div className="axil-blog-list">
                  <Link href={`/blog/${featuredPost.slug}`} legacyBehavior>
                    <a className="text-decoration-none">
                      <h2 className="title">{featuredPost.Title}</h2>
                      {featuredPost.Excerpt && <p>{featuredPost.Excerpt}</p>}
                      {featuredPost.FeaturedImage && (
                        <div className="thumbnail">
                          <Image
                            width={850}
                            height={450}
                            className="w-100"
                            src={featuredPost.FeaturedImage}
                            alt={featuredPost.Title || 'blog-post'}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={placeholderLight}
                          />
                        </div>
                      )}
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-12 mt_md--40 mt_sm--30">
              {filteredItems && (
                <BlogSidebar recentPost={filteredItems.slice(0, 5)} />
              )}
            </div>
          </div>
        )}

        {filteredItems && <BlogGridPost posts={paginatedItems} />}

        <Pagination
          postPerpage={POST_PER_PAGE}
          totalPages={totalPages}
          currentpage={currentPage}
          handleClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default BlogContent;
