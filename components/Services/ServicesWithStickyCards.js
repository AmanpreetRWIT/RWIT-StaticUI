import Image from 'next/legacy/image';
import React from 'react';
import Link from 'next/link';
import { getImageDimension } from '../../helpers/utilities';
import Button from '../buttons/Button';

const ServicesWithStickyCards = ({ blok }) => {
  const CardTitleColor = blok?.CardTitleColor || '';
  const CardDescriptionColor = blok?.CardDescriptionColor || '#757589';

  return (
    <div
      className="ax-section-gap--lg sticky_service__container"
      style={blok?.BGColor ? { background: blok?.BGColor } : {}}
    >
      <div className={`container`}>
        <div
          className={`sticky_service ${blok?.showImageOnRight ? 'right' : ''} ${
            !blok?.Services.length > 0 ? 'column' : ''
          } ${
            blok?.Tags || blok?.Title || blok?.Image || blok?.Description
              ? ''
              : 'full-width'
          }`}
        >
          {(blok?.Tags || blok?.Title || blok?.Image || blok?.Description) && (
            <div className="sticky_service__left section-title">
              <div className="sticky_service_c" >
                {blok?.Tags && Array.isArray(blok?.Tags)
                  ? blok?.Tags.map((tag, index) => (
                      <span key={index} className="sub-title extra11-color" style={{color:"#2690D4",border:"1px solid #2690D4",background:"#D4E9F6"}} >
                        {tag}
                      </span>
                    ))
                  : null}

                {blok?.Title && (
                  <h2
                    className={`title`}
                    style={{ color: blok?.TitleColor || '' }}
                  >
                    {blok?.Title}
                  </h2>
                )}

                {blok?.Description && (
                  <div
                    className={`sticky_service__desc ${
                      blok?.DescriptionColor ? 'custom-color' : ''
                    }`}
                    style={{
                      color: blok?.DescriptionColor || '#757589',
                    }}
                  >
                    {(blok?.Description)}
                  </div>
                )}

                {blok?.Button?.length > 0 &&
                  blok.Button.map((button, index) => {
                    const link = button?.Link || {};
                    const hrefCandidate =
                      link?.story?.url ?? link?.cached_url ?? link?.url ?? '';
                    if (!hrefCandidate) return null;

                    return (
                      <Button
                        key={button?._uid || `button-${index}`}
                        button={button}
                        index={index}
                      />
                    );
                  })}

              </div>

              {blok?.Image && (
                <div className="sticky_service_img">
                  <Image
                    loading="lazy"
                    width={getImageDimension(blok?.Image, 420, 270).width}
                    height={getImageDimension(blok?.Image, 420, 270).height}
                    src={blok?.Image}
                    alt={blok?.ImageAlt || ''}
                  />
                </div>
              )}
            </div>
          )}
          {blok?.Services.length > 0 && (
            <div className="sticky_service__content" style={{ color: CardTitleColor }}>
              <div className="sticky_service__wrap">
                {blok?.Services.map((service, index) => (
                  <div key={`service${index}`}>
                    {service?.Link ? (
                      <Link href={service?.Link} legacyBehavior>
                        <a>
                          <div className="sticky_service__items">
                            {service?.Image && (
                              <div className="sticky_service__icon">
                                <Image
                                  loading="lazy"
                                  width={60}
                                  height={60}
                                  src={service?.Image}
                                  alt={service?.AltText || 'service image'}
                                />
                              </div>
                            )}

                            <div className="sticky_service__items__wrap">
                              <h3
                                className="sticky_service__title"
                                style={{ color: CardTitleColor }}
                              >
                                {service?.Heading}
                              </h3>
                              {service?.Description && (
                                <div
                                  className="sticky_service__detail custom-color"
                                  style={{ color: CardDescriptionColor }}
                                >
                                  {(service?.Description)}
                                </div>
                              )}
                              <p className="mt-2"> Learn More...</p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ) : (
                      <div className="sticky_service__items">
                        {service?.Image && (
                          <div className="sticky_service__icon">
                            <Image
                              loading="lazy"
                              width={60}
                              height={60}
                              src={service?.Image}
                              alt={service?.AltText || 'service image'}
                            />
                          </div>
                        )}

                        <div className="sticky_service__items__wrap">
                          <h3
                            className="sticky_service__title"
                            style={{ color: CardTitleColor }}
                          >
                            {service?.Heading}
                          </h3>
                          {service?.Description && (
                            <div
                              className="sticky_service__detail custom-color"
                              style={{ color: CardDescriptionColor }}
                            >
                              {(service?.Description)}
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
