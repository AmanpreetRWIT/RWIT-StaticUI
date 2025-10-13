import Link from 'next/link';
import Image from 'next/legacy/image';
import { formatDateString } from '../../helpers/utilities';
import { placeholderLight } from '../../helpers/utilities';

const BlogSidebar = ({ categories, tags, recentPost }) => {
  return (
    <div className="axil-blog-sidebar">
      <div className="axil-single-widget small-post-wrapper mt--0 mt_sm--30 mt_md--30 mt_lg--40">
        <h3 className="title mb--30">Recent post</h3>
        <div className="inner">
          {recentPost?.map((post, index) => (
            <div className="small-post" key={`recent-post-${index}`}>
              <div className="thumbnail flex-shrink-0">
                {
                  // Support both shapes: nested content.FeaturedImage.filename or flat post.FeaturedImage (string)
                  (post?.content?.FeaturedImage?.filename || post?.FeaturedImage) && (
                    <Link href={`/blog/${post.slug}`} legacyBehavior>
                      <a>
                        <Image
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={placeholderLight}
                          width={100}
                          height={80}
                          src={post?.content?.FeaturedImage?.filename || post?.FeaturedImage}
                          alt={
                            post?.content?.FeaturedImage?.alt
                              ? post?.content?.FeaturedImage?.alt
                              : 'Blog Image'
                          }
                        />
                      </a>
                    </Link>
                  )
                }
              </div>
              <div className="content">
                <h4>
                  <Link href={`/blog/${post?.slug}`} legacyBehavior>
                    <a>{post?.content?.Title || post?.Title}</a>
                  </Link>
                </h4>
                <ul className="blog-meta">
                  {(post?.content?.ArticleDate || post?.ArticleDate) && (
                    <li>
                      {formatDateString(
                        (post?.content?.ArticleDate || post?.ArticleDate)?.split(' ')[0]
                      )}
                    </li>
                  )}
                  <li>{`${post?.content?.ReadTime || post?.ReadTime} min to read`}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
