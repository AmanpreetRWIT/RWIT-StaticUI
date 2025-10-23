import SectionTitle from '../common/SectionTitle';
import Image from 'next/legacy/image';

const OurOffice = ({ Title, Tags, TitleColor, BGColor, OfficeCard }) => {
  return (
    <div
      className="axil-office-location-area ax-section-gap bg-color-lightest"
      style={BGColor?.color ? { background: BGColor.color } : {}}
    >
      <div className={`container`}>
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={Title}
              subtitle={Tags}
              alignment="center"
              titleColor={TitleColor?.color || ''}
            />
          </div>
        </div>
        <div className="row mt--30 justify-content-center">
          {OfficeCard &&
            OfficeCard.length > 0 &&
            OfficeCard.map((data, index) => (
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
                      <div>{data?.Description}</div>
                    )}
                    {/* Render buttons if needed, update as per new JSON structure */}
                    {data?.Button &&
                      data?.Button.map((Button, index) => (
                        <button key={'block' + index}>{Button.label}</button>
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
