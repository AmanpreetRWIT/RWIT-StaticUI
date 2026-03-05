import Image from "next/legacy/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDateString } from '../../helpers/utilities';
import { placeholderLight } from '../../helpers/utilities';


const BlogPost = ({ post, postType = 'default' }) => {
  const [isWindow, setIsWindow] = useState(false);
  const [author, setAuthor] = useState({});

  return (
    <>
      {postType === 'default' && (
        <div className="axil-blog-list">
          <div className="blog-top">
            <div className="author mb-3">
              <div className="author-thumb">
                <Image
                  loading="lazy"
                  placeholder="blur"	
                  blurDataURL={placeholderLight}
                  width={50}
                  height={50}
                  src="/images/rwit-logos.svg"
                  alt="Blog Author"
                />
              </div>
              <div className="info">
                <h6>Jaswinder Singh</h6>
                <ul className="blog-meta">
                  <li className="post-meta-date">
                    {formatDateString(
                      post?.published_at ||
                        post?.first_published_at ||
                        post?.created_at
                    )}
                  </li>
                  <li className="post-meta-reading-time">{`${post?.content?.ReadTime} min to read`}</li>
                </ul>
              </div>
            </div>
          </div>
          {post?.content?.Categories && post?.content?.Categories.length > 0 && (
            <div className="blog-top">
              <div className="author">
                <div className="author-thumb">
                  <h6 className="mb-0">Category :</h6>
                </div>
                <div className="info">
                  <ul className="blog-meta">
                    {post?.content?.Categories &&
                      post?.content?.Categories.map((category, index) => (
                        <li
                          className="post-meta-categories"
                          key={`cat-list-${index}`}
                        >
                          {category?.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="thumbnail">
            <Link href={`/blog/${post?.slug}`} legacyBehavior>
              <a>
                {post?.content?.FeaturedImage?.filename && (
                  <Image
                    loading="lazy"
                    placeholder="blur"	
                    blurDataURL={placeholderLight}
                    width={850}
                    height={450}
                    className="w-100"
                    src={post?.content?.FeaturedImage?.filename}
                    alt={
                      post?.content?.FeaturedImage?.alt
                        ? post?.content?.FeaturedImage?.alt
                        : 'blog-post'
                    }
                    priority={true}
                  />
                )}
              </a>
            </Link>
          </div>

          <div className="content">
            {post.content.SubTitle && <p>{post.content.SubTitle}</p>}

            {post.slug && (
              <Link href={`/blog/${post.slug}`} legacyBehavior>
                <a className="axil-button btn-large btn-transparent">
                  <span className="button-text">Read More</span>
                  <span className="button-icon" />
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPost;
