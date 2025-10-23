import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Utility functions for placeholder and image dimensions
const placeholderLight = '/placeholder-light.png'; // replace with your placeholder path

const getImageDimension = (src) => {
  // Dummy function: adjust if you need dynamic dimensions
  return { width: 585, height: 203 };
};

const getImageSrc = (author) => {
  // Replace with actual author image source if available
  return '/author-placeholder.png';
};

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const CategoryCard = ({ blog }) => {
  return (
    <Link className="categoryCard" href={`/blog/${blog?.slug}`}>
      <div className="categoryCard__img">
        <Image
          placeholder="blur"
          blurDataURL={placeholderLight}
          src={blog?.content?.FeaturedImage?.filename}
          width={getImageDimension(blog?.content?.FeaturedImage?.filename).width}
          height={getImageDimension(blog?.content?.FeaturedImage?.filename).height}
          alt={blog?.content?.FeaturedImage?.alt || 'Blog image'}
          className="selectDisable"
        />
      </div>

      {blog?.content?.Title && (
        <h2 className="categoryCard__title">{blog?.content?.Title}</h2>
      )}

      {blog?.content?.Excerpt && (
        <p className="categoryCard__desc clamped-text">
          {blog?.content?.Excerpt}
        </p>
      )}

      <div className="categoryCard__avatar axil-blog-details-area">
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
                  src={(blog?.content?.img)}
                  alt={`Blog Author: ${blog?.content?.Author}`}
                />
              </div>
              <div className="info">
                <h3>{blog?.content?.Author || 'Unknown Author'}</h3>
                <ul className="blog-meta">
                  <li className="post-meta-date">
                    {formatDateString(
                      blog?.first_published_at ||
                      blog?.published_at ||
                      blog?.created_at
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
