import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDateString } from '../../helpers/utilities';
import { placeholderLight } from '../../helpers/utilities';
import { getImageDimension } from '../../helpers/utilities';
import { getImageSrc } from '../../helpers/utilities';

const CategoryCard = ({ blog }) => {
  console.log('blog', blog?.Title)
  return (
    <>
      <Link className="categoryCard" href={`/blog/${blog?.slug}`}>
        <div className="categoryCard__img">
          <Image
            placeholder="blur"
            blurDataURL={placeholderLight}
            src={blog?.FeaturedImage?.filename}
            width={getImageDimension(blog?.FeaturedImage?.filename).width}
            height={203}
            alt={blog?.FeaturedImage?.alt ? blog?.FeaturedImage?.alt : 'Blog images'}
            className="selectDisable"
          />
        </div>
        {blog?.Title && <h2 className="categoryCard__title">{blog?.Title}</h2>}
        {blog?.Excerpt && <p className="categoryCard__desc clamped-text">{blog?.Excerpt}</p>}

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
                    src={getImageSrc(blog?.Author)}
                    alt={`Blog Author: ${blog?.Author}`}
                  />
                </div>
                <div className="info">
                  <h3>{blog?.Author || 'Jaswinder Singh'}</h3>
                  <ul className="blog-meta">
                    <li className="post-meta-date">
                      {formatDateString(blog?.published_at || blog?.created_at)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
