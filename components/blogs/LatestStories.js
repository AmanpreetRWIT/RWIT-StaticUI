import Link from 'next/link';
import Image from 'next/legacy/image';
import { useState } from 'react';
import { getImageDimension, formatDateString, placeholderLight } from '../../helpers/utilities';
import SectionTitle from '../common/SectionTitle';
import { SearchComponent } from '../search/Search';

const LatestStories = ({
  BGColor = '#f8f9fa',
  Title,
  Tags = [],
  Description,
  TitleColor = '#000',
  DescriptionColor = '#555',
  ShowDynamicData = true,
  ShowSearchField = false,
  ShowCategory = false,
  Layout = 'col-3',
  LatestBlogs = [],
  LoaderImage,
  Button = []
}) => {
  const [activeBlog, setActiveBlog] = useState(0);

  const latestBlogs = ShowDynamicData ? LatestBlogs.slice(0, 3) : LatestBlogs;

  const changeActive = (index) => {
    setActiveBlog(index);
  };

  const getLayoutClass = (layout) => {
    switch (layout) {
      case 'col-1': return 'col-lg-12 col-md-6 col-12 mb--40';
      case 'col-2': return 'col-lg-6 col-md-6 col-12 mb--40';
      case 'col-3': return 'col-lg-4 col-md-6 col-12 mb--40';
      case 'col-4': return 'col-lg-3 col-md-6 col-12 mb--40';
      default: return 'col-lg-4 col-md-6 col-12 mb--40';
    }
  };

  const FeatureCard = latestBlogs[0];
  const blogCards = latestBlogs.slice(1);

  return (
    <div
      className="latestStories axil-blog-area ax-section-gap bg-color-lightest"
      style={{ background: BGColor }}
    >
      {ShowSearchField && (
        <div className="blogSearch__wrapper">
          <SearchComponent />
        </div>
      )}

      <div className="latestStories__cont container">
        {(Title || Description || Tags.length > 0) && (
          <div className="row">
            <div className="col-lg-12">
              <SectionTitle
                title={Title}
                subtitle={Tags}
                description={Description}
                alignment="center"
                titleColor={TitleColor}
                descriptionColor={DescriptionColor}
              />
            </div>
          </div>
        )}

        {FeatureCard ? (
          <div className="latestStories__wrapper">
            <div className="latestStories__leftgrid">
              <Link href={`/blog/${FeatureCard?.slug}`}>
                <div className="latestStories__card">
                  <div className="latestStories__cardimg">
                    <Image
                      placeholder="blur"
                      blurDataURL={placeholderLight}
                      src={FeatureCard?.FeaturedImage}
                      width={getImageDimension(FeatureCard?.FeaturedImage).width}
                      height={getImageDimension(FeatureCard?.FeaturedImage).height}
                      alt={FeatureCard?.Title || 'Blog image'}
                    />
                  </div>
                  <div className="latestStories__content">
                    {ShowCategory && <span className="category">{FeatureCard?.Category}</span>}
                    <p>{formatDateString(FeatureCard?.PublishedAt)}</p>
                    <h3 className="title">{FeatureCard?.Title}</h3>
                    <p className="clamped-text">{FeatureCard?.Excerpt}</p>
                    <div className="latestStories__link">Read more...</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="latestStories__rightgrid">
              {blogCards.map((blog, index) => (
                <Link key={index} href={`/blog/${blog?.slug}`}>
                  <div className="latestStories__card">
                    <div className="latestStories__cardimg2 latestStories__thumbnail">
                      <Image
                        placeholder="blur"
                        blurDataURL={placeholderLight}
                        src={blog?.ThumbnailImage}
                        width={getImageDimension(blog?.ThumbnailImage).width}
                        height={getImageDimension(blog?.ThumbnailImage).height}
                        alt={blog?.Title || 'Blog image'}
                      />
                    </div>
                    <div className="latestStories__cardimg2 latestStories__featuredimg">
                      <Image
                        placeholder="blur"
                        blurDataURL={placeholderLight}
                        src={blog?.FeaturedImage}
                        width={getImageDimension(blog?.FeaturedImage).width}
                        height={getImageDimension(blog?.FeaturedImage).height}
                        alt={blog?.Title || 'Blog image'}
                      />
                    </div>
                    <div className="latestStories__content">
                      {ShowCategory && <span className="category">{blog?.Category}</span>}
                      <p>{formatDateString(blog?.PublishedAt)}</p>
                      <h3 className="title">{blog?.Title}</h3>
                      <p className="clamped-text">{blog?.Excerpt}</p>
                      <div className="latestStories__link">Read more...</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image src={LoaderImage} width={120} height={120} alt="Loading..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestStories;
