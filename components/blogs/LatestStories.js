import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getImageDimension } from '../../helpers/utilities';
import { formatDateString } from '../../helpers/utilities';
import { placeholderLight } from '../../helpers/utilities';
import Loader from '../../public/images/loader.gif';
import SectionTitle from '../common/SectionTitle';
import { SearchComponent } from '../search/Search';
import { useRouter } from 'next/router';
import Button from '../buttons/Button';

const LatestStories = ({ blok }) => {
  const router = useRouter();
  const data = require('../../public/blogData.json');
  const [activeBlog, setActiveBlog] = useState(0);
  const latestBlogs = data && data?.stories?.length > 0 ? data?.stories?.slice(0, 3) : [];

  const changeActive = (index) => {
    setActiveBlog(index);
  };

  const Layout = (Layout) => {
    if (Layout === 'col-1') return 'col-lg-12 col-md-6 col-12 mb--40';
    else if (Layout === 'col-2') return 'col-lg-6 col-md-6 col-12 mb--40';
    else if (Layout === 'col-3') return 'col-lg-4 col-md-6 col-12 mb--40';
    else if (Layout === 'col-4') return 'col-lg-4 col-md-6 col-12 mb--40';
    else '';
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
          // Remove any locale prefix from the URL
          const urlParts = href.split('/').filter((part) => part !== '');
          const blogIndex = urlParts.indexOf('blog');

          if (blogIndex >= 0) {
            // Reconstruct URL without locale
            const newPath = urlParts.slice(blogIndex).join('/');
            const newHref = newPath ? `/${newPath}` : null;

            // Only update if newHref is valid and different to prevent infinite loops
            if (newHref && link.getAttribute('href') !== newHref) {
              link.setAttribute('href', newHref);
            }
          }
        }
      });
    }
  };

  // Run on initial render after DOM is ready
  useLayoutEffect(() => {
    handleRouteChange();
  }, []);

  // Handle route changes
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {blok?.OldLayout ? (
        <div
          className='axil-blog-area ax-section-gap bg-color-lightest'
          style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
        >
          <div className={`container`}>
            <div className='row'>
              <div className='col-lg-12'>
                <SectionTitle
                  title={blok?.Title}
                  subtitle={blok?.Tags}
                  description={blok?.Description}
                  alignment='center'
                  titleColor={blok?.TitleColor?.color || ''}
                  descriptionColor={
                    blok?.DescriptionColor?.color ? blok?.DescriptionColor?.color : ''
                  }
                />
              </div>
            </div>
            <div className='row justify-content-center blog-list-wrapper mt--20'>
              {blok?.ShowDynamicData && latestBlogs ? (
                <>
                  {latestBlogs?.map((blog, index) => (
                    <Link key={`blog-post-${index}`} href={`/blog/${blog?.slug}`} legacyBehavior>
                      <div className={`${Layout(blok?.Layout)}`}>
                        {blog?.content?.FeaturedImage?.filename && (
                          <div className='thumbnail'>
                            <div className='image'>
                              <a>
                                <Image
                                  placeholder='blur'
                                  blurDataURL={placeholderLight}
                                  src={blog?.content?.FeaturedImage?.filename}
                                  width={
                                    parseInt(getImageDimension(blog?.content?.FeaturedImage?.filename).width, 10)
                                  }
                                  height={
                                    parseInt(getImageDimension(blog?.content?.FeaturedImage?.filename).height, 10)
                                  }
                                  alt={
                                    blog?.content?.FeaturedImage?.alt
                                      ? blog?.content?.FeaturedImage?.alt
                                      : 'Blog images'
                                  }
                                  sizes='(max-width: 768px) 100vw, 
                                         (max-width: 1200px) 50vw, 
                                         600px'
                                />
                              </a>
                            </div>
                          </div>
                        )}
                        <div
                          className={`axil-blog axil-control  ${
                            activeBlog === index ? 'active' : ''
                          }`}
                          onMouseEnter={() => changeActive(index)}
                        >
                          <div className='blog__cards'>
                            <p>
                              {blok?.ShowCategory && <span className='category'>Lifestyle</span>}
                            </p>

                            <p>
                              {formatDateString(
                                blog?.first_published_at || blog?.published_at || blog?.created_at
                              )}
                            </p>
                          </div>

                          <div className='content'>
                            <div className=''>
                              <div className='inner'>
                                {blok?.ShowCategory && <span className='category'>Lifestyle</span>}

                                {blog?.content?.Title && (
                                  <h3 className='title'>
                                    <a className='text-ellipsis'>{blog?.content?.Title}</a>
                                  </h3>
                                )}
                                {blog?.content?.Excerpt}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {blok?.LatestBlogs?.map((blog, index) => (
                    <Link key={`blog-post-${index}`} href={`/blog/${blog?.slug}`} legacyBehavior>
                      <div className={`${Layout(blok?.Layout)}`}>
                        {blog?.content?.FeaturedImage?.filename && (
                          <div className='thumbnail'>
                            <div className='image'>
                              <a>
                                <Image
                                  placeholder='blur'
                                  blurDataURL={placeholderLight}
                                  src={blog?.content?.FeaturedImage?.filename}
                                  width={
                                    parseInt(getImageDimension(blog?.content?.FeaturedImage?.filename).width, 10)
                                  }
                                  height={
                                    parseInt(getImageDimension(blog?.content?.FeaturedImage?.filename).height, 10)
                                  }
                                  alt={
                                    blog?.content?.FeaturedImage?.alt
                                      ? blog?.content?.FeaturedImage?.alt
                                      : 'Blog images'
                                  }
                                  sizes='(max-width: 768px) 100vw, 
                                         (max-width: 1200px) 50vw, 
                                         600px'
                                />
                              </a>
                            </div>
                          </div>
                        )}
                        <div
                          className={`axil-blog axil-control  ${
                            activeBlog === index ? 'active' : ''
                          }`}
                          onMouseEnter={() => changeActive(index)}
                        >
                          <div className='blog__cards'>
                            <p>
                              {blok?.ShowCategory && <span className='category'>Lifestyle</span>}
                            </p>

                            <p>
                              {formatDateString(
                                blog?.published_at || blog?.first_published_at || blog?.created_at
                              )}
                            </p>
                          </div>

                          <div className='content'>
                            <div className=''>
                              <div className='inner'>
                                {blok?.ShowCategory && <span className='category'>Lifestyle</span>}

                                {blog?.content?.Title && (
                                  <h3 className='title'>
                                    <a className='text-ellipsis'>{blog?.content?.Title}</a>
                                  </h3>
                                )}
                                {blog?.content?.Excerpt}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          id='latestStories'
          className='latestStories axil-blog-area ax-section-gap bg-color-lightest '
          style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
        >
          {blok?.ShowSearchField && (
            <div className={`${blok?.ShowSearchField ? 'blogSearch__wrapper' : ''}`}>
              <SearchComponent />
            </div>
          )}

          <div className={`latestStories__cont container`}>
            {(blok?.Title || blok?.Description || blok?.Tags?.length > 0) && (
              <div className='row'>
                <div className='col-lg-12'>
                  <SectionTitle
                    title={blok?.Title}
                    subtitle={blok?.Tags}
                    description={blok?.Description}
                    alignment='center'
                    titleColor={blok?.TitleColor?.color || ''}
                    descriptionColor={
                      blok?.DescriptionColor?.color ? blok?.DescriptionColor?.color : ''
                    }
                  />
                </div>
              </div>
            )}

            {FeatureCard ? (
              <div className='latestStories__wrapper'>
                <div className='latestStories__leftgrid'>
                  <Link
                    href={
                      FeatureCard?.slug
                        ? `/blog/${FeatureCard?.slug.toLowerCase().replace(/\/us/i, '')}`
                        : '#'
                    }
                  >
                    <div className='latestStories__card'>
                      <div className='latestStories__cardimg'>
                        <Image
                          placeholder='blur'
                          blurDataURL={placeholderLight}
                          src={FeatureCard?.content?.FeaturedImage?.filename}
                                                  width={
                            parseInt(getImageDimension(FeatureCard?.content?.FeaturedImage?.filename).width, 10) || 614
                          }
                          height={
                            parseInt(getImageDimension(FeatureCard?.content?.FeaturedImage?.filename).height, 10) || 317
                          }
                          alt={
                            FeatureCard?.content?.FeaturedImage?.alt
                              ? FeatureCard?.content?.FeaturedImage?.alt
                              : 'Blog images'
                          }
                          sizes='(max-width: 768px) 100vw, 
                                         (max-width: 1200px) 50vw, 
                                         600px'
                        />
                      </div>

                      <div className='latestStories__content'>
                        <div className='latestStories__tags'>
                          <span className='category'></span>

                          <p>
                            {formatDateString(
                              FeatureCard?.first_published_at ||
                                FeatureCard?.published_at ||
                                FeatureCard?.created_at
                            )}
                          </p>
                        </div>
                        {FeatureCard?.content?.Title && (
                          <h3 className='title'>{FeatureCard?.content?.Title}</h3>
                        )}

                        <p className='clamped-text'> {FeatureCard?.content?.Excerpt}</p>

                        <div className='latestStories__link'>
                          {FeatureCard?.slug && 'Read more...'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className='latestStories__rightgrid'>
                  {blogCards?.map((blog, index) => (
                    <Link key={index} href={`/blog/${blog?.slug}`}>
                      <div className='latestStories__card' id='latestCards'>
                        <div className='latestStories__cardimg2 latestStories__thumbnail'>
                          <Image
                            placeholder='blur'
                            blurDataURL={placeholderLight}
                            src={blog?.content?.ThumbnailImage?.filename}
                            width={parseInt(getImageDimension(blog?.content?.ThumbnailImage?.filename).width, 10)}
                            height={
                              parseInt(getImageDimension(blog?.content?.ThumbnailImage?.filename).height, 10)
                            }
                            alt={
                              blog?.content?.FeaturedImage?.alt
                                ? blog?.content?.FeaturedImage?.alt
                                : 'Blog images'
                            }
                            sizes='(max-width: 768px) 100vw, 
                                         (max-width: 1200px) 50vw, 
                                         600px'
                          />
                        </div>

                        <div className='latestStories__cardimg2 latestStories__featuredimg'>
                          <Image
                            placeholder='blur'
                            blurDataURL={placeholderLight}
                            src={blog?.content?.FeaturedImage?.filename}
                            width={parseInt(getImageDimension(blog?.content?.FeaturedImage?.filename).width, 10)}
                            height={
                              parseInt(getImageDimension(blog?.content?.FeaturedImage?.filename).height, 10)
                            }
                            alt={
                              blog?.content?.FeaturedImage?.alt
                                ? blog?.content?.FeaturedImage?.alt
                                : 'Blog images'
                            }
                            sizes='(max-width: 768px) 100vw, 
                                         (max-width: 1200px) 50vw, 
                                         600px'
                          />
                        </div>

                        <div className='latestStories__content'>
                          <div className='latestStories__tags'>
                            <span className='category'></span>

                            <p>
                              {formatDateString(
                                blog?.first_published_at || blog?.published_at || blog?.created_at
                              )}
                            </p>
                          </div>
                          {blog?.content?.Title && (
                            <h3 className='title'>{blog?.content?.Title}</h3>
                          )}

                          <p className='clamped-text'> {blog?.content?.Excerpt}</p>

                          <div className='latestStories__link'>Read more...</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={blok?.LoaderImage?.filename || Loader}
                  width={120}
                  height={120}
                  alt={'Blog images'}
                />
              </div>
            )}
          </div>
          {FeatureCard && blok?.Button?.length > 0 && (
            <div className='latestStories__btn'>
              <div className='slider-button gap-4 d-flex'>
                {blok?.Button.map((button, index) => (
                  <Button blok={button} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LatestStories;
