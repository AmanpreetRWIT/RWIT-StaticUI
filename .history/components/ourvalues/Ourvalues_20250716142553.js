import Link from 'next/link';
import SectionTitle from '../common/SectionTitle';


const OurValues = ({ blok }) => {
  const cardTitleColor = blok?.OurValueCardTitleColor?.color
    ? blok?.OurValueCardTitleColor?.color
    : '';
  const cardDescriptionColor = blok?.OurValueCardDescriptionColor?.color
    ? blok?.OurValueCardDescriptionColor?.color
    : '';
  const serviceColor = (index) => {
    if (index === 0) return 'color-var--4';
    else if (index === 1) return 'color-var--2';
    else if (index === 2) return 'color-var--3';
    else if (index === 3) return 'color-var--4';
    else if (index === 4) return 'color-var--5';
    else if (index === 5) return 'color-var--2';
    else '';
  };

  const cardAlignment = (alignment) => {
    if (alignment == 'text-left') return 'text-left';
    else if (alignment == 'text-center') return 'text-center mx-auto';
    else return '';
  };
  return (
    <div
      id="our-value"
      className="axil-service-area ax-section-gap bg-color-lightest"
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={blok?.Title}
              subtitle={blok?.Tags}
              description={blok?.Description}
              titleColor={
                blok?.TitleColor?.color ? blok?.TitleColor?.color : ''
              }
              descriptionColor={
                blok?.DescriptionColor?.color
                  ? blok?.DescriptionColor?.color
                  : ''
              }
              alignment="center"
            />
          </div>
        </div>
        {blok?.OurValueCard && (
          <div
            className={`row justify-content-center ${
              blok?.OurValueCardTextColor?.color ? 'custom-color' : ''
            }`}
            style={
              blok?.OurValueCardTextColor?.color
                ? { color: blok?.OurValueCardTextColor?.color }
                : {}
            }
          >
            {blok?.OurValueCard &&
              blok?.OurValueCard?.map((service, index) => (
                <div
                  className="col-lg-4 col-md-6 col-12 mt--50 mt_md--40 mt_sm--30"
                  key={`service-${index}`}
                >
                  <div
                    className={`axil-service-style--3 ${serviceColor(index)}`}
                  >
                    <div
                      className={`icon ${cardAlignment(
                        blok?.OurValueCardTextAlignment
                      )}`}
                      style={
                        service?.CounterBgColor?.color
                          ? {
                              background: service?.CounterBgColor?.color,
                            }
                          : {}
                      }
                    >
                      {service?.Counter ? (
                        <div>
                          {service?.Counter && (
                            <div
                              className={`text ${
                                service?.CounterColor?.color
                                  ? 'custom-color'
                                  : ''
                              }`}
                              style={
                                service?.CounterColor?.color
                                  ? { color: service?.CounterColor?.color }
                                  : {}
                              }
                            >
                              {service?.Counter}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text">{index + 1}</div>
                      )}
                    </div>
                    <div
                      className={`content ${cardAlignment(
                        blok?.OurValueCardTextAlignment
                      )}`}
                    >
                      {service?.Heading && (
                        <h3 className="title">
                          {service?.Link?.story?.url || service?.Link?.url ? (
                            <Link
                              href={
                                service?.Link?.story?.url || service?.Link?.url
                              }
                              style={
                                cardTitleColor ? { color: cardTitleColor } : {}
                              }
                            >
                              {service?.Heading}
                            </Link>
                          ) : (
                            <> {service?.Heading}</>
                          )}
                        </h3>
                      )}

                      {service?.Description && (
                        <div
                          className="custom-color"
                          style={
                            cardDescriptionColor
                              ? { color: cardDescriptionColor }
                              : {}
                          }
                        >
                          {render(service?.Description)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurValues;
