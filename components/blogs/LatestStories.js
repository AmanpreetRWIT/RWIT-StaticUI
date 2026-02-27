import Link from 'next/link';
import Image from 'next/legacy/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getImageDimension, formatDateString, placeholderLight } from '../../helpers/utilities';
import Loader from '../../public/images/loader.gif';
import SectionTitle from '../common/SectionTitle';
import { SearchComponent } from '../search/Search';
import { useRouter } from 'next/router';
import Button from '../buttons/Button';

const LatestStories = ({ data, blok }) => {
  const storiesData = data || blok;
  const router = useRouter();
  const [activeBlog, setActiveBlog] = useState(0);
  const latestBlogs =
    storiesData?.stories?.length > 0 ? storiesData.stories.slice(0, 3) : [];

  const changeActive = (index) => {
    setActiveBlog(index);
  };

  const Layout = (Layout) => {
    if (Layout === 'col-1') return 'col-lg-12 col-md-6 col-12 mb--40';
    else if (Layout === 'col-2') return 'col-lg-6 col-md-6 col-12 mb--40';
    else if (Layout === 'col-3') return 'col-lg-4 col-md-6 col-12 mb--40';
    else if (Layout === 'col-4') return 'col-lg-4 col-md-6 col-12 mb--40';
    else return '';
  };

  const FeatureCard = latestBlogs[0];
  const blogCards = latestBlogs?.slice(1);

  const handleRouteChange = () => {
    const latestStoriesSection = document.getElementById('latestStories');

    if (latestStoriesSection) {
      const links = latestStoriesSection.querySelectorAll('a[href*="/blog/"]');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          const urlParts = href.split('/').filter((part) => part !== '');
          const blogIndex = urlParts.indexOf('blog');

          if (blogIndex >= 0) {
            const newPath = urlParts.slice(blogIndex).join('/');
            const newHref = newPath ? `/${newPath}` : null;
            if (newHref && link.getAttribute('href') !== newHref) {
              link.setAttribute('href', newHref);
            }
          }
        }
      });
    }
  };

  useLayoutEffect(() => {
    handleRouteChange();
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div
        id="latestStories"
        className="latestStories axil-blog-area ax-section-gap bg-color-lightest"
        style={storiesData?.BGColor ? { background: storiesData.BGColor } : {}}
      >
        {storiesData?.ShowSearchField && (
          <div className="blogSearch__wrapper">
            <SearchComponent />
          </div>
        )}

        <div className="latestStories__cont container">
          {(storiesData?.ShowSectionTitle) && (storiesData?.Title || storiesData?.Description || storiesData?.Tags?.length > 0) && (
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle
                  title={storiesData?.Title}
                  subtitle={storiesData?.Tags}
                  description={storiesData?.Description}
                  alignment="center"
                  titleColor={storiesData?.TitleColor || ''}
                  descriptionColor={storiesData?.DescriptionColor || ''}
                />
              </div>
            </div>
          )}

          {FeatureCard ? (
            <div className="latestStories__wrapper">
              <div className="latestStories__leftgrid">
                <Link
                  href={
                    FeatureCard?.slug
                      ? `/blog/${FeatureCard?.slug.toLowerCase()}`
                      : '#'
                  }
                >
                  <div className="latestStories__card">
                    <div className="latestStories__cardimg">
                      <Image
                        placeholder="blur"
                        blurDataURL={placeholderLight}
                        src={FeatureCard?.content?.FeaturedImage?.src}
                        width={FeatureCard?.content?.FeaturedImage?.width || 800}
                        height={FeatureCard?.content?.FeaturedImage?.height || 600}
                        alt={
                          FeatureCard?.content?.FeaturedImage?.alt ||
                          'Blog image'
                        }
                      />
                    </div>

                    <div className="latestStories__content">
                      <div className="latestStories__tags">
                        <span className="category"></span>
                        <p>
                          {formatDateString(
                            FeatureCard?.first_published_at ||
                            FeatureCard?.published_at ||
                            FeatureCard?.created_at
                          )}
                        </p>
                      </div>

                      <h3 className="title">
                        {FeatureCard?.content?.Title}
                      </h3>

                      <p className="clamped-text">
                        {FeatureCard?.content?.Excerpt}
                      </p>

                      <div className="latestStories__link">
                        {FeatureCard?.slug && 'Read more...'}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="latestStories__rightgrid">
                {blogCards?.map((blog, index) => (
                  <Link key={index} href={`/blog/${blog?.slug}`}>
                    <div className="latestStories__card" id="latestCards">
                      <div className="latestStories__cardimg2 latestStories__thumbnail">
                        <Image
                          placeholder="blur"
                          blurDataURL={placeholderLight}
                          src={blog?.content?.ThumbnailImage?.filename}
                          width={
                            getImageDimension(
                              blog?.content?.ThumbnailImage?.filename
                            ).width
                          }
                          height={
                            getImageDimension(
                              blog?.content?.ThumbnailImage?.filename
                            ).height
                          }
                          alt={
                            blog?.content?.ThumbnailImage?.alt || 'Blog image'
                          }
                        />
                      </div>

                      <div className="latestStories__content">
                        <div className="latestStories__tags">
                          <p>
                            {formatDateString(
                              blog?.first_published_at ||
                              blog?.published_at ||
                              blog?.created_at
                            )}
                          </p>
                        </div>
                        <h3 className="title">{blog?.content?.Title}</h3>
                        <p className="clamped-text">
                          {blog?.content?.Excerpt}
                        </p>
                        <div className="latestStories__link">Read more...</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src={Loader}
                width={120}
                height={120}
                alt={'Blog loader'}
              />
            </div>
          )}
        </div>
        {FeatureCard && storiesData?.Buttons?.length > 0 && (
          <div className="latestStories__btn">
            <div className="slider-button gap-4 d-flex">
              {storiesData.Buttons.map((button, index) => (
                <Button button={button} key={index} />

              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LatestStories;
