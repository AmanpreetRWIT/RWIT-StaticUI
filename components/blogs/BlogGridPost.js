import Image from 'next/legacy/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { placeholderLight, useMobile } from '../../helpers/utilities';

const BlogGridPost = ({ posts }) => {
  const isMobile = useMobile();
  const [isWindow, setIsWindow] = useState(false);
  useEffect(() => {
    setIsWindow(isMobile);
  }, [isMobile]);
  return (
    <>
      <div className="ax-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            {posts &&
              posts?.map((post, index) => {
                let blogDescription;
                const limit = isWindow ? 150 : 250;
                const excerpt = post?.content?.Excerpt || post?.Excerpt;
                blogDescription =
                  excerpt?.length > limit ? excerpt.slice(0, limit) + '...' : excerpt;
                return (
                  <div
                    className="col-lg-4 col-sm-6 col-12 mt-4 blog-post-wrap"
                    key={`post${index}`}
                  >
                    <div className="axil-blog-list grid-post">
                      <Link href={`/blog/${post?.slug}`} legacyBehavior>
                        <a>
                          <div className="thumbnail">
                            {(post?.content?.FeaturedImage?.filename || post?.FeaturedImage) && (
                              <Image
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={placeholderLight}
                                width={417}
                                height={235}
                                className="w-100"
                                src={post?.content?.FeaturedImage?.filename || post?.FeaturedImage}
                                alt={
                                  post?.content?.FeaturedImage?.alt
                                    ? post?.content?.FeaturedImage?.alt
                                    : 'blog-post'
                                }
                              />
                            )}
                          </div>
                          <div className="content">
                            {(post?.content?.Title || post?.Title) && (
                              <h4> {post?.content?.Title || post?.Title}</h4>
                            )}
                            {(post?.content?.Excerpt || post?.Excerpt) && <p>{blogDescription}</p>}
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogGridPost;
