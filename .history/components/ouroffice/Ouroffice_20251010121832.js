import SectionTitle from '../common/SectionTitle';
import Image from 'next/legacy/image';

import { StoryblokComponent } from '@storyblok/react';
const OurOffice = ({ blok }) => {
  return (
    <div
      className="axil-office-location-area ax-section-gap bg-color-lightest"
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div className={`container`}>
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={blok?.Title}
              subtitle={blok?.Tags}
              alignment="center"
              titleColor={blok?.TitleColor?.color || ''}
            />
          </div>
        </div>
        <div className="row mt--30 justify-content-center">
          {blok?.OfficeCard &&
            blok?.OfficeCard.length > 0 &&
            blok?.OfficeCard.map((data, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-12"
                key={`card-${index}`}
              >
                <div
                  className="axil-office-location mt--30"
                >
                  {data?.Image?.filename && (
                    <div className="thumbnail align-img">
                      <Image
                        loading="lazy"
                        width={300}
                        height={180}
                        src={data?.Image?.filename}
                        alt={data?.Image?.alt ? data?.Image?.alt : 'our office'}
                      />
                    </div>
                  )}
                  <div className="content text-center">
                    {data?.Heading && (
                      <h4 className="title">{data?.Heading}</h4>
                    )}

                    {data?.Description && (
                      <div>{render(data?.Description)}</div>
                    )}
                    {data?.Button &&
                      data?.Button.map((Button, index) => (
                        <StoryblokComponent
                          blok={Button}
                          key={'block' + index}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OurOffice;
