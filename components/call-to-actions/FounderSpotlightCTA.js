'use client';

import Image from 'next/image';
import Button from "@/components/buttons/Button";

export default function FounderSpotlightCTA({ blok }) {
  
  const quote = (blok?.FounderQuote);
  const bgStyle = {};
  if (blok?.BgColor?.color) bgStyle.background = blok.BgColor.color;
  else if (typeof blok?.BgColor === 'string' && blok.BgColor) bgStyle.background = blok.BgColor;

  return (
    <section className='founderSpotlight'>
      <div
        className='founderSpotlight__container'
        style={bgStyle}
      >
        {/* Left Content */}
        <div className={`founderSpotlight__left ${!blok?.FounderImage?.filename ? "founderSpotlight__no-image" : ""}`}>
          {blok?.Heading && <h3 className='founderSpotlight__title'>{blok?.Heading}</h3>}

          {blok?.Description && (
            <div className='founderSpotlight__description'>{blok?.Description}</div>
          )}

          {blok?.Button && (
            <div className='founderSpotlight__buttons'>
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
          )}
        </div>

        {/* Right Content */}
        <div className={`founderSpotlight__right ${!blok?.FounderImage?.filename ? "founderSpotlight__no-image" : ""}`}>
          {blok?.FounderImage?.filename && (
            <div className='founderSpotlight__image-wrapper'>
              <Image
                src={blok?.FounderImage?.filename}
                alt={blok?.FounderImage?.alt || 'Founder Image'}
                width={292}
                height={352}
                className='founderSpotlight__right__image'
              />
            </div>
          )}

          <div className='founderSpotlight__right__content'>
            {quote && (
              <div className='founderSpotlight__right__content__quote'>
                <Image
                  src={'/images/quote-blue.svg'}
                  width={48}
                  height={48}
                  alt='Quote icon'
                  className='founderSpotlight__right__content__quote__icon'
                />
                <div
                  className='founderSpotlight__quote-text'
                  dangerouslySetInnerHTML={{ __html: quote }}
                ></div>
              </div>
            )}

            <div className='founderSpotlight__right__content__author'>
              {blok?.FounderName && (
                <h4 className='founderSpotlight__right__content__author__name'>
                  {blok?.FounderName}
                </h4>
              )}
              {blok?.Designation && (
                <p className='founderSpotlight__right__content__author__role'>
                  {blok?.Designation}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
