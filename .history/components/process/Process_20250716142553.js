import Tilt from 'react-parallax-tilt';
import SectionTitle from '../common/SectionTitle';
import Image from "next/legacy/image";

import { StoryblokComponent } from '@storyblok/react';

const Process = ({ blok }) => {
  return (
    <div
      className="axil-working-process-area ax-section-gap theme-gradient-4"
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div
        className={`container`}>
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={blok?.Title}
              subtitle={blok?.Tags}
              description={blok?.Description}
              color="extra08-color"
              alignment="center"
              styleClass="mb--100 mb_sm--40 mb_md--40"
              titleColor={blok?.TitleColor?.color || ''}
              descriptionColor ={blok?.DescriptionColor?.color ? blok?.DescriptionColor?.color : ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {blok?.ProcessCard &&
              blok?.ProcessCard?.map((strategy, index) => (
                <div
                  key={`strategy-${index}`}

                  className={
                    index % 2 === 0
                      ? 'axil-working-process mb--100 mb_md--50 mb_sm--40'
                      : 'axil-working-process mb--100 text-start mb_md--50 mb_sm--40'
                  }
                >
                  <div
                    className={
                      index % 2 === 0
                        ? 'thumbnail'
                        : 'thumbnail order-1 order-lg-2'
                    }
                  >
                    {strategy?.Image?.filename && (
                      <div className="image paralax-image">
                        <Tilt tiltMaxAngleX={9} tiltMaxAngleY={9}>
                          <Image
                            loading="lazy"
                            width={410}
                            height={414}
                            src={strategy?.Image?.filename}
                            alt={
                              strategy?.Image?.alt
                                ? strategy?.Image?.alt
                                : 'Process Images'
                            }
                          />
                        </Tilt>
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      index % 2 === 0
                        ? 'content '
                        : 'content order-2 order-lg-1'
                    }
                  >
                    <div className="inner">
                      <div className="section-title">
                        {strategy?.Index ? (
                          <span className="process-step-number">
                            {strategy?.Index}
                          </span>
                        ) : (
                          <span className="process-step-number">
                            {index + 1}
                          </span>
                        )}

                        {strategy?.Tags &&
                          strategy?.Tags?.map((tag, index) => (
                            <StoryblokComponent
                              blok={tag}
                              key={`tag-${index}`}
                            />
                          ))}

                        {strategy?.Heading && (
                          <h2 className="title">{strategy?.Heading}</h2>
                        )}

                        {strategy?.Description && (
                          <div className="subtitle-2">
                            {render(strategy?.Description)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
