import Image from 'next/legacy/image';

import { StoryblokComponent } from '@storyblok/react';
const TestimonialCard = ({
  column,
  testimonialClass,
  data,
  index,
  activeIndex,
  changeActive,
  TitleColor = '',
}) => {
  return (
    <div
      className={column}
    >
      <div
        className={`${testimonialClass} ${
          activeIndex === index ? 'active' : ''
        }`}
        onMouseEnter={() => changeActive(index)}
      >
        <div className="inner">
          <div className="clint-info-wrapper">
            {data?.ProfileImage?.filename && (
              <div className="thumb">
                {data?.ProfileImage?.filename && (
                  <Image
                    loading="lazy"
                    width={60}
                    height={60}
                    src={data?.ProfileImage?.filename}
                    alt={
                      data?.ProfileImage?.alt
                        ? data?.ProfileImage?.alt
                        : 'profile image'
                    }
                  />
                )}
              </div>
            )}

            <div className="client-info">
              {data?.Name && (
                <h3
                  className="title"
                  style={TitleColor ? { color: TitleColor } : {}}
                >
                  {data?.Name}
                </h3>
              )}
              {data?.Designation && <span>{data?.Designation}</span>}
            </div>
          </div>
          <div className="description">
            <div className="subtitle-3"> {render(data?.Description)} </div>
            {data?.Link &&
              data?.Link.map((Button, index) => (
                <StoryblokComponent blok={Button} key={'block' + index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
