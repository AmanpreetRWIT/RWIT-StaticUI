import React from 'react';
import { StoryblokComponent } from '@storyblok/react';
import SectionTitle from '../common/SectionTitle';
import PricingIcons from './PricingIcons';
import { InfoIcons } from './PricingIcons';

const PricingPlan = ({ blok }) => {
  return (
    <div
      id="PricingPlane"
      className={`pricing d-flex align-items-center  `}
      style={
        blok?.BGColor?.color
          ? {
              backgroundColor: `${blok?.BGColor?.color}`,
            }
          : {}
      }
    >
      <div className={`pricing-container container`}>
        <div className="row">
          <div className="col-lg-12">
            <div className="axil-call-to-action position-relative">
              <SectionTitle
                titleClass=""
                title={blok?.Heading}
                subtitle={blok?.Tags}
                alignment="center"
                description={blok?.Description}
                titleColor={blok?.HeadingColor?.color}
                descriptionColor={
                  blok?.DescriptionColor?.color
                    ? blok?.DescriptionColor?.color
                    : ''
                }
              />

              <div className="text-center"></div>
            </div>

            <div className="compare"></div>
          </div>
        </div>
        <div className="pricing-wrapper ">
          {blok?.PricingCard?.map((Item, index) => {
            return (
              <div
                className={`pricing-table ${
                  Item?.Featured ? 'featured-table' : ''
                }`}
                key={index}
              >
                {Item?.Featured && Item?.FeaturedText && (
                  <div className="pricing-badge">
                    <p>{Item?.FeaturedText}</p>
                  </div>
                )}
                <div className="pricing-innertable">
                  {Item?.Title && (
                    <div className="pricing-table-title">
                      <h3 style={Item?.Featured ? { color: '#fff' } : {}}>
                        {Item?.Title}
                      </h3>
                    </div>
                  )}
                  {Item?.SubTitle && (
                    <div className="pricing-table-subtitle">
                      <p style={Item?.Featured ? { color: '#fff' } : {}}>
                        {Item?.SubTitle}
                      </p>
                    </div>
                  )}

                  {Item?.Features?.map((feature, index) => {
                    return (
                      <div className="pricing-table-feature" key={index}>
                        <span>
                          <PricingIcons isFeatured={Item?.Featured} />
                        </span>
                        <div className="position-relative">
                          <p
                            className={`${
                              feature?.IsHover ? 'featured-wrapper' : ''
                            }`}
                            style={Item?.Featured ? { color: '#fff' } : {}}
                          >
                            {feature?.Text}

                            {feature?.InfoText && feature?.IsHover && (
                              <span className="featured-icon">
                                {feature?.InfoText && (
                                  <span
                                    className={`   ${
                                      feature?.InfoText ? 'featured-text' : ''
                                    } `}
                                  >
                                    {feature?.InfoText}
                                  </span>
                                )}
                                <InfoIcons isFeatured={Item?.Featured} />
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    className={`${
                      Item?.Featured ? 'featured-btn' : ''
                    } pricing-btn d-flex pricing-btn `}
                  >
                    {Item?.Button?.map((button, index) => (
                      <StoryblokComponent blok={button} key={'block' + index} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
