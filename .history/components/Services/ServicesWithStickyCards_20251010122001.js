import Image from 'next/legacy/image';
import React from 'react';

import { StoryblokComponent } from '@storyblok/react';
import { getImageDimension } from '../../helpers/utilities';
import Link from 'next/link';

const ServicesWithStickyCards = ({ blok }) => {
  const CardTitleColor = blok?.CardTitleColor?.color
    ? blok?.CardTitleColor?.color
    : '';
  const CardDescriptionColor = blok?.CardDescriptionColor?.color
    ? blok?.CardDescriptionColor?.color
    : '#757589';

  return (
    <div
      className="ax-section-gap--lg sticky_service__container"
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div className={`container`}>
        <div
          className={`sticky_service ${blok?.showImageOnRight ? 'right' : ''} ${
            !blok?.Services.length > 0 ? 'column' : ''
          } ${
            blok?.Tags.length > 0 ||
            blok?.Title ||
            blok?.Image?.filename ||
            blok?.Description?.content[0]?.content != undefined
              ? ''
              : 'full-width'
          }`}
        >
          {(blok?.Tags.length > 0 ||
            blok?.Title ||
            blok?.Image?.filename ||
            blok?.Description?.content[0]?.content != undefined) && (
            <div className="sticky_service__left section-title">
              <div className="sticky_service_c">
                {blok?.Tags && Array.isArray(blok?.Tags)
                  ? blok?.Tags?.map((tag, index) => (
                      <StoryblokComponent blok={tag} key={index} />
                    ))
                  : null}

                {blok?.Title && (
                  <h2
                    className={`title`}
                    style={{
                      color: blok?.TitleColor?.color
                        ? blok?.TitleColor?.color
                        : '',
                    }}
                  >
                    {blok?.Title}
                  </h2>
                )}

                {blok?.Description && (
                  <div
                    className={`sticky_service__desc  ${
                      blok?.DescriptionColor?.color ? 'custom-color' : ''
                    }`}
                    style={{
                      color: blok?.DescriptionColor?.color
                        ? blok?.DescriptionColor?.color
                        : '#757589',
                    }}
                  >
                    {(blok?.Description)}
                  </div>
                )}
              </div>

              {blok?.Image?.filename && (
                <div className="sticky_service_img">
                  <Image
                    loading="lazy"
                    width={
                      getImageDimension(blok?.Image?.filename, 420, 270).width
                    }
                    height={
                      getImageDimension(blok?.Image?.filename, 420, 270).height
                    }
                    src={blok?.Image?.filename}
                    alt={blok?.Image?.alt ? blok?.Image?.alt : ''}
                  />
                </div>
              )}
            </div>
          )}
          {blok?.Services.length > 0 && (
            <div
              className="sticky_service__content"
              style={{ color: CardTitleColor }}
            >
              {/* card section */}
              <div className="sticky_service__wrap">
                {blok?.Services &&
                  blok?.Services.map((service, index) => (
                    <div key={`service${index}`}>
                      {service?.Link?.url || service?.Link?.story?.url ? (
                        <Link
                          href={service?.Link?.url || service?.Link?.story?.url}
                          legacyBehavior
                        >
                          <a>
                            <div className="sticky_service__items">
                              {service?.Image?.filename && (
                                <div className="sticky_service__icon">
                                  <Image
                                    loading="lazy"
                                    width={60}
                                    height={60}
                                    src={service?.Image?.filename}
                                    alt={
                                      service?.Image?.alt
                                        ? service?.Image?.alt
                                        : 'service image'
                                    }
                                  />
                                </div>
                              )}

                              <div className="sticky_service__items__wrap">
                                <h3
                                  className="sticky_service__title"
                                  style={{ color: CardTitleColor }}
                                >
                                  {' '}
                                  {service?.Heading}
                                </h3>
                                {service?.Description && (
                                  <div
                                    className="sticky_service__detail custom-color"
                                    style={{ color: CardDescriptionColor }}
                                  >
                                    {render(service?.Description)}
                                  </div>
                                )}
                                <p className="mt-2"> Learn More...</p>
                              </div>
                            </div>
                          </a>
                        </Link>
                      ) : (
                        <div className="sticky_service__items">
                          {service?.Image?.filename && (
                            <div className="sticky_service__icon">
                              <Image
                                loading="lazy"
                                width={60}
                                height={60}
                                src={service?.Image?.filename}
                                alt={
                                  service?.Image?.alt
                                    ? service?.Image?.alt
                                    : 'service image'
                                }
                              />
                            </div>
                          )}

                          <div className="sticky_service__items__wrap">
                            <h3
                              className="sticky_service__title"
                              style={{ color: CardTitleColor }}
                            >
                              {' '}
                              {service?.Heading}
                            </h3>
                            {service?.Description && (
                              <div
                                className="sticky_service__detail custom-color"
                                style={{ color: CardDescriptionColor }}
                              >
                                {render(service?.Description)}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ServicesWithStickyCards;
