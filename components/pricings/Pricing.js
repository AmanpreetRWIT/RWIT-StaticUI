import { useState } from 'react';

const Pricing = ({ data }) => {
  const [priceFilterValue, setPriceFilterValue] = useState('monthly');
  return (
    <main className="page-wrappper">
      <div
        className="axil-pricing-table-area pricing-shape-position ax-section-gap bg-color-lightest"
        style={data?.BGColor?.color ? { background: data?.BGColor?.color } : {}}
      >
        <div className="container">
          <div className="row row--25 justify-content-center">
            {data?.PricingCard &&
              data?.PricingCard?.map((service, index) => (
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
                            data?.TextColor?.color
                              ? { color: data?.TextColor?.color }
                              : {}
                          }
                        >
                          {service?.Title}
                        </h4>
                        <p>{service?.SubTitle}</p>
                        {service?.Price && (
                          <div className="price-wrapper">
                            <div className="price">
                              <h2 className="currency">{service?.DefaultPrice}</h2>
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
                              <a
                                key={'button' + index}
                                href={Button.url}
                                className="axil-btn btn-large btn-transparent"
                              >
                                {Button.label}
                              </a>
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
        {!data?.DisableBgShape && (
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
