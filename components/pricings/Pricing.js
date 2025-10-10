import { useState } from 'react';
import { StoryblokComponent } from '@storyblok/react';

const Pricing = ({ blok }) => {
  const [priceFilterValue, setPriceFilterValue] = useState('monthly');
  return (
    <main className="page-wrappper">
      <div
        className="axil-pricing-table-area pricing-shape-position ax-section-gap bg-color-lightest"
        style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
      >
        <div
          className={`container`}  
        >
          <div className="row row--25 justify-content-center">
            {blok?.PricingCard &&
              blok?.PricingCard?.map((service, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <div
                    className={`axil-pricing-table prcing-style-2 mt--40 mt_sm--60 ${
                      service?.Featured ? 'active' : ''
                    }`}
                  >
                    <div className="axil-pricing-inner">
                      <div className="pricing-header">
                        <h4
                          style={
                            blok?.TextColor?.color ? { color: blok?.TextColor?.color } : {}
                          }
                        >
                          {service?.Title}</h4>
                        <p>{service?.SubTitle}</p>
                        {service?.Price && (
                          <div className="price-wrapper">
                            <div className="price">
                              <h2 className="currency">{service?.Price}</h2>
                              <h2 className="heading headin-h3">
                                {priceFilterValue === 'monthly'
                                  ? service?.Price.monthly
                                  : service?.Price.yearly}
                              </h2>
                              <span>
                                {priceFilterValue === 'monthly'
                                  ? '/month'
                                  : '/year'}
                              </span>
                            </div>
                            {/* <div className="date-option">
                              <select value={priceFilterValue} onChange={handleChange}>
                                <option value="yearly">Yearly</option>
                                <option value="monthly">Monthly</option>
                              </select>
                            </div> */}
                          </div>
                        )}

                        <div className="pricing-get-button">
                          {service.Button &&
                            service.Button.map((Button, index) => (
                              <StoryblokComponent
                                blok={Button}
                                key={'block' + index}
                              />
                            ))}
                        </div>
                        <span className="subtitle">{service?.ButtonNote}</span>
                      </div>
                      <div className="pricing-body">
                        <div className="inner">
                          <ul className="list-style">
                            {service.Features?.map((Feature, index) => (
                              <li key={`pricing-feature-${index}`}>
                                {Feature.Feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {!blok?.DisableBgShape && (
          <div className="shape-group">
            <div className="shape">
              <i className="icon icon-shape-15"></i>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Pricing;
