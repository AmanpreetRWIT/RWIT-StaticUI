import Image from "next/legacy/image";
import React from 'react';
import { getImageDimension } from '../../helpers/utilities';
import SectionTitle from '../common/SectionTitle';

export const ServiceswithFeaturedImage = ({ blok }) => {
  return (
    <div
      className="ax-section-gap--lg ax_service__container"
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div className={`container`}>
        <div
          className={`ax__service ${blok?.showImageOnRight ? 'right' : ''} ${
            blok?.Image?.filename ? '' : 'column-1'
          }`}
        >
          {blok?.Image?.filename && (
            <div className="ax__service_img">
              <Image
                loading="lazy"
                width={getImageDimension(blok?.Image?.filename).width}
                height={getImageDimension(blok?.Image?.filename).height}
                src={blok?.Image?.filename}
                alt={blok?.Image?.alt ? blok?.Image?.alt : 'image'}
              />
            </div>
          )}

          <div className="ax__service__content">
            <SectionTitle
              titleClass="mb-0"
              title={blok?.Title}
              subtitle={blok?.Tags}
              alignment="center"
              animation={false}
              titleColor={blok?.TitleColor?.color || ''}
            />
            {blok?.Description && (
              <div
                className="service__desc custom-color service__description"
                style={{
                  color: blok?.DescriptionColor?.color
                    ? blok?.DescriptionColor?.color
                    : '#757589',
                }}
              >
                {(blok?.Description)}
              </div>
            )}

            <div className={`ax__service__wrap ${blok?.ColumnCount}`}>
              {blok?.Services &&
                blok?.Services.map((service, index) => (
                  <div className="ax__service__items" key={`service${index}`}>
                    <h4 className="ax__service__title"> {service?.Heading}</h4>
                    {service?.Description && (
                      <div className="ax__service__desc">
                        {(service?.Description)}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceswithFeaturedImage;
