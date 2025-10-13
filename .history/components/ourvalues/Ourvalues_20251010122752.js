import Link from 'next/link';
import SectionTitle from '../common/SectionTitle';


const OurValues = ({
  Title,
  Tags,
  Description,
  TitleColor,
  DescriptionColor,
  BGColor,
  OurValueCard,
  OurValueCardTextColor,
  OurValueCardTextAlignment,
  OurValueCardTitleColor,
  OurValueCardDescriptionColor
}) => {
  const cardTitleColor = OurValueCardTitleColor?.color || '';
  const cardDescriptionColor = OurValueCardDescriptionColor?.color || '';
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
      style={BGColor?.color ? { background: BGColor.color } : {}}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={Title}
              subtitle={Tags}
              description={Description}
              titleColor={TitleColor?.color || ''}
              descriptionColor={DescriptionColor?.color || ''}
              alignment="center"
            />
          </div>
        </div>
        {OurValueCard && (
          <div
            className={`row justify-content-center ${OurValueCardTextColor?.color ? 'custom-color' : ''}`}
            style={OurValueCardTextColor?.color ? { color: OurValueCardTextColor.color } : {}}
          >
            {OurValueCard.map((service, index) => (
              <div
                className="col-lg-4 col-md-6 col-12 mt--50 mt_md--40 mt_sm--30"
                key={`service-${index}`}
              >
                <div className={`axil-service-style--3 ${serviceColor(index)}`}>
                  <div
                    className={`icon ${cardAlignment(OurValueCardTextAlignment)}`}
                    style={service?.CounterBgColor?.color ? { background: service?.CounterBgColor?.color } : {}}
                  >
                    {service?.Counter ? (
                      <div>
                        <div
                          className={`text ${service?.CounterColor?.color ? 'custom-color' : ''}`}
                          style={service?.CounterColor?.color ? { color: service?.CounterColor?.color } : {}}
                        >
                          {service?.Counter}
                        </div>
                      </div>
                    ) : (
                      <div className="text">{index + 1}</div>
                    )}
                  </div>
                  <div className={`content ${cardAlignment(OurValueCardTextAlignment)}`}>
                    {service?.Heading && (
                      <h3 className="title">
                        {service?.Link?.url ? (
                          <Link
                            href={service?.Link?.url}
                            style={cardTitleColor ? { color: cardTitleColor } : {}}
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
                        style={cardDescriptionColor ? { color: cardDescriptionColor } : {}}
                      >
                        {service?.Description}
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
