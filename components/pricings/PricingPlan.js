import React from "react";
import SectionTitle from "../common/SectionTitle";
import PricingIcons, { InfoIcons } from "./PricingIcons";
import Button from "../buttons/Button";

const PricingPlan = ({ data }) => {
  return (
    <div
      id="PricingPlane"
      className={`pricing d-flex align-items-center`}
      style={
        data?.BGColor?.color
          ? {
              backgroundColor: `${data?.BGColor?.color}`,
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
                title={data?.Heading}
                subtitle={data?.Tags}
                alignment="center"
                description={data?.Description}
                titleColor={data?.HeadingColor?.color}
                descriptionColor={
                  data?.DescriptionColor?.color
                    ? data?.DescriptionColor?.color
                    : ""
                }
              />

              <div className="text-center"></div>
            </div>

            <div className="compare"></div>
          </div>
        </div>
        <div className="pricing-wrapper">
          {data?.PricingCard?.map((Item, index) => {
            return (
              <div
                className={`pricing-table ${
                  Item?.Featured ? "featured-table" : ""
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
                      <h3 style={Item?.Featured ? { color: "#fff" } : {}}>
                        {Item?.Title}
                      </h3>
                    </div>
                  )}
                  {Item?.SubTitle && (
                    <div className="pricing-table-subtitle">
                      <p style={Item?.Featured ? { color: "#fff" } : {}}>
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
                              feature?.IsHover ? "featured-wrapper" : ""
                            }`}
                            style={Item?.Featured ? { color: "#fff" } : {}}
                          >
                            {feature?.Text}

                            {feature?.InfoText && feature?.IsHover && (
                              <span className="featured-icon">
                                {feature?.InfoText && (
                                  <span
                                    className={`${
                                      feature?.InfoText ? "featured-text" : ""
                                    }`}
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
                      Item?.Featured ? "featured-btn" : ""
                    } pricing-btn d-flex pricing-btn`}
                  >
                    {Item?.Button?.length > 0 &&
                      Item.Button.map((button, index) => {
                        const link = button?.Link || {};
                        const hrefCandidate =
                          link?.story?.url ??
                          link?.cached_url ??
                          link?.url ??
                          "";
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
