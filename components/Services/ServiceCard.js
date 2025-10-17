import Image from 'next/legacy/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';

const ServiceCard = ({
  column,
  serviceClass,
  index,
  activeIndex,
  data,
  changeActive,
  alignment = 'center',
  TextColor = '',
  RemoveAnimations,
  RemoveBorders,
}) => {
  console.log('data', data?.Image)
  const [textAlignment, setTextAlignment] = useState('text-center');
  useEffect(() => {
    if (alignment === 'center') setTextAlignment('text-center');
    else if (alignment === 'right') setTextAlignment('text-end');
    else setTextAlignment('text-start');
  }, [alignment]);

  return (
    <div className={column}>
      <Tilt
        tiltMaxAngleX={RemoveAnimations ? 0 : 7}
        tiltMaxAngleY={RemoveAnimations ? 0 : 7}
      >
        <div
          className={`axil-service axil-control paralax-image ${serviceClass ? serviceClass : ''} ${textAlignment} ${
            activeIndex === index ? 'active' : ''
          }`}
          onMouseEnter={() => changeActive(index)}
        >
          <div className={`inner ${RemoveBorders ? 'hide-border' : ''} ${data?.HideBorder ? 'hide-border' : ''}`}>
            {data?.Image && (
              <div
                className={`icon ${data?.GradientStyle} ${
                  data?.HideBG ? 'hide-bg' : ''
                }`}
              >
                <div
                  className="icon-inner"
                  style={
                    data?.IconBgColor
                      ? { background: data?.IconBgColor}
                      : {}
                  }
                >
                  <div className="image-2">
                    {data?.Image && (
                      <Image
                        loading="lazy"
                        width={46}
                        height={36}
                        src={data?.Image}
                        alt={
                          data?.AltText ? data?.AltText : 'Shape Images'
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="content">
              {data?.Heading && (
                <h3
                  className="title"
                  style={TextColor ? { color: TextColor } : {}}
                >
                  {data?.Heading}
                </h3>
              )}
              <div className="service__desc">{(data?.Description)}</div>

              {(data?.Link?.url || data?.Link?.story?.url) && (
                <Link
                  href={data?.Link?.url || data?.Link?.story?.url}
                  prefetch={false}
                  className="axil-button mt-4"
                >
                  Learn More
                </Link>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default ServiceCard;
