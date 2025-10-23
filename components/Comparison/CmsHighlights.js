import Image from 'next/legacy/image';
import CheckIcon from '../Icons/CheckIcon';
import SectionTitle from '../common/SectionTitle';
import { placeholderLight } from '../../helpers/utilities';

function CmsHighlights({ data }) {
  const CmsOne = data?.CmsOne;
  const CmsTwo = data?.CmsTwo;

  return (
    <div
      id="CmsHighlights"
      className="highlights axil-featured-area"
      style={data?.BgColor ? { background: data?.BgColor } : {}}
    >
      <div className={`highlights-container container`}>
        <div className="position-relative">
          <SectionTitle
            titleClass=""
            title={data?.Title || ''}
            subtitle={data?.Tags}
            alignment="center"
            description={data?.Description || ''}
            titleColor={data?.TitleColor || ''}
            descriptionColor={data?.DescriptionColor || ''}
          />
        </div>
        {!data?.ApplyCardWithImage ? (
          <div
            className="highlights-wrapper"
            style={
              data?.ApplyBorder
                ? {
                    border: '1px solid',
                    borderColor: data?.BorderColor || '#EFEFEF',
                  }
                : {}
            }
          >
            <div className="highlights-left">
              <div className="left-content">
                <div className="highlights-left--heading">
                  {CmsOne?.CmsLogo && (
                    <Image
                      src={CmsOne?.CmsLogo || ''}
                      alt=""
                      height={52}
                      width={50}
                      loading="lazy"
                    />
                  )}
                  <h2>{CmsOne?.CmsName}</h2>
                </div>
                {CmsOne?.Highlights?.map((item, index) => (
                  <div className="highlights-row" key={index}>
                    <span>
                      <CheckIcon />
                    </span>
                    <p>{item?.Feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="highlights-divider"></div>
            <div className="highlights-right">
              <div className="right-content">
                <div className="highlights-right--heading">
                  {CmsTwo?.CmsLogo && (
                    <Image
                      src={CmsTwo?.CmsLogo || ''}
                      alt=""
                      height={52}
                      width={50}
                      loading="lazy"
                    />
                  )}
                  <h2>{CmsTwo?.CmsName}</h2>
                </div>

                {CmsTwo?.Highlights?.map((item, index) => (
                  <div className="highlights-row" key={index}>
                    <span>
                      <CheckIcon />
                    </span>
                    <p>{item?.Feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="highlights-wrapper2">
            <div className="highlights-left2">
              <div className="left-content">
                <div className="highlights-left2--heading">
                  {CmsOne?.CmsLogo && (
                    <Image
                      src={CmsOne?.CmsLogo || ''}
                      alt=""
                      height={52}
                      width={50}
                      loading="lazy"
                    />
                  )}
                  <h2>{CmsOne?.CmsName}</h2>
                </div>
                {CmsOne?.Highlights?.map((item, index) => (
                  <div className="highlights-row" key={index}>
                    <span>
                      <CheckIcon />
                    </span>
                    <p>{item?.Feature}</p>
                  </div>
                ))}
              </div>
              <div className={`highlights-imgOne`}>
                {data?.CmsOneImage && (
                  <Image
                    placeholder="blur"
                    blurDataURL={placeholderLight}
                    src={data?.CmsOneImage}
                    width={500}
                    height={320}
                    alt="cmsOne"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="highlights-right2">
              <div className="right-content">
                <div className="highlights-right2--heading">
                  {CmsTwo?.CmsLogo && (
                    <Image
                      src={CmsTwo?.CmsLogo || ''}
                      alt=""
                      height={52}
                      width={50}
                      loading="lazy"
                    />
                  )}
                  <h2>{CmsTwo?.CmsName}</h2>
                </div>

                {CmsTwo?.Highlights?.map((item, index) => (
                  <div className="highlights-row" key={index}>
                    <span>
                      <CheckIcon />
                    </span>
                    <p>{item?.Feature}</p>
                  </div>
                ))}
              </div>

              <div className={`highlights-imgTwo`}>
                {data?.CmsTwoImage && (
                  <Image
                    placeholder="blur"
                    blurDataURL={placeholderLight}
                    src={data?.CmsTwoImage}
                    width={500}
                    height={320}
                    alt="cmsTwo"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CmsHighlights;
