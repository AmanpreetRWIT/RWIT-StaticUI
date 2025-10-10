import Image from 'next/legacy/image';
import Link from 'next/link';

import { useMobile } from '../../helpers/utilities';
const TestimonialClientCard = ({
  column,
  testimonialClass,
  data,
  index,
  activeIndex,
  changeActive,
}) => {
  const isMobile = useMobile();
  return (
    <div
      className={column} >
      <div
        className={`${testimonialClass} ${
          activeIndex === index ? 'active' : ''
        }`}
        onMouseEnter={() => changeActive(index)}
      >
        <div className="inner">
          <div className="clint-info-wrapper">
            {data?.content?.ClientImage && (
              <div className="thumb">
                {data?.content?.ClientImage?.filename && (
                  <Image
                    loading="lazy"
                    width={60}
                    height={60}
                    src={data?.content?.ClientImage?.filename}
                    alt={
                      data?.content?.ClientImage?.alt
                        ? data?.content?.ClientImage?.alt
                        : 'profile image'
                    }
                  />
                )}
              </div>
            )}

            <div className="client-info">
              {data?.content?.FirstName && (
                <h3 className="title">
                  {`${
                    data?.content?.FirstName ? data?.content?.FirstName : ''
                  } ${data?.content?.LastName ? data?.content?.LastName : ''}`}
                </h3>
              )}

              {data?.content?.ContactPosition && (
                <span>{data?.content?.ContactPosition}</span>
              )}
            </div>
          </div>
          <div className="description">
            {data?.content?.Testimonial && (
              <div className="subtitle-3">
                {render(data?.content?.Testimonial)}
              </div>
            )}

            {(data?.content?.WebsiteURL.url ||
              data?.content?.WebsiteURL?.story?.url) && (
              <Link
                href={
                  data?.content?.WebsiteURL.url ||
                  data?.content?.WebsiteURL?.story?.url
                }
                legacyBehavior
              >
                <a className="axil-link-button">Read Project Case Study</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialClientCard;
