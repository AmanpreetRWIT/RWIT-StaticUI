import Image from 'next/legacy/image';
import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { renderRichText } from '../../helpers/utilities';

const ServicesWithLeftTitle = ({ blok }) => {
  return (
    <div
      className='ax-section-gap--lg service-left-title'
      style={blok?.BGColor ? { background: blok?.BGColor } : {}}
    >
      <div className={`container`}>
        <div
          className={`service ${blok?.InvertColumn ? 'right' : ''}
         ${
           blok?.Tags.length > 0 ||
           blok?.Title ||
           blok?.Description? '' : 'full-width'
         }
         ${blok?.Services.length > 0 ? '' : 'full-width'}
         `}
        >
          {(blok?.Tags.length > 0 ||
            blok?.Title ||
            blok?.Description) && (
            <div className='service__left'>
              <SectionTitle
                titleClass='mb-0'
                title={blok?.Title}
                subtitle={blok?.Tags}
                alignment='left'
                animation={false}
                titleColor={blok?.TitleColor || ''}
              />
              {blok?.Description && (
                <div
                  className='service__desc custom-color'
                  style={{
                    color: blok?.DescriptionColor
                      ? blok?.DescriptionColor
                      : '#757589',
                  }}
                >
                  {renderRichText(blok?.Description)}
                </div>
              )}
            </div>
          )}
          {blok?.Services.length > 0 && (
            <div className='service__content'>
              <div className='service__wrap'>
                {blok?.Services &&
                  blok?.Services.map((service, index) => (
                    <div className='service__items' key={`service${index}`}>
                      {service?.Image?.filename && (
                        <div className='service__icon'>
                          <Image
                            loading='lazy'
                            width={60}
                            height={60}
                            src={service?.Image?.filename}
                            alt={service?.Image?.alt ? service?.Image?.alt : 'service image'}
                          />
                        </div>
                      )}
                      {service?.Heading && <h3 className='service__title'> {service?.Heading}</h3>}
                      {service?.Description && (
                        <div className='service__desc'>{service?.Description}</div>
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

export default ServicesWithLeftTitle;
