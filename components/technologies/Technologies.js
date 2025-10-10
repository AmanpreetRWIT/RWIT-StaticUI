import Image from "next/legacy/image";
import Link from 'next/link';
import { getImageDimension } from '../../helpers/utilities';
import { useState } from 'react';

const Technologies = ({ data }) => {
  const [isActive, setIsActive] = useState(null);

  const accordiaonToggle = (index) => {
    if (isActive === index) {
      setIsActive(null);
    } else {
      setIsActive(index);
    }
  };

  const RowTitleColor = data?.RowTitleColor || "";

  return (
    <div
      className="tech ax-section-gap"
      style={{ background: data?.BGColor || {} }}
    >
      <div className="container">
        {data?.Tags && data.Tags.length > 0 && (
          <div className="section-title tag">
            {data.Tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}

        {data?.Title && (
          <h2
            className="title tech__sticky"
            style={{
              background: data?.BGColor || {},
              color: data?.TitleColor || {},
            }}
          >
            {data.Title}
          </h2>
        )}

        {data?.Technologies &&
          data.Technologies.map((item, index) => (
            <div
              className={`tech__wrap ${isActive === index ? 'mb-0' : ''}`}
              key={`tech-${index}`}
            >
              <div className="tech__content">
                <div
                  className={`tech__content__wrap ${
                    isActive === index ? 'rotate' : ''
                  }`}
                  onClick={() => accordiaonToggle(index)}
                >
                  {item?.RowHeading && (
                    <h3
                      className="tech__content__title"
                      style={RowTitleColor ? { color: RowTitleColor } : {}}
                    >
                      {item.RowHeading}
                    </h3>
                  )}
                </div>

                <div className={`tech__items ${isActive === index ? 'show' : ''}`}>
                  {item?.RowImage &&
                    item.RowImage.map((tech, idx) => (
                      <div className="tech__item" key={`image-${idx}`}>
                        {tech.Image?.filename && (
                          <div className="tech__icon">
                            {tech.ImageLink ? (
                              <Link href={tech.ImageLink} legacyBehavior>
                                <a>
                                  <Image
                                    loading="lazy"
                                    width={getImageDimension(tech.Image.filename).width}
                                    height={getImageDimension(tech.Image.filename).height}
                                    src={
                                      tech.Grayscale
                                        ? `${tech.Image.filename}/m/filters:grayscale()`
                                        : tech.Image.filename
                                    }
                                    alt={tech.Image.alt || tech.Image.title || 'Tech Image'}
                                  />
                                </a>
                              </Link>
                            ) : (
                              <Image
                                loading="lazy"
                                width={getImageDimension(tech.Image.filename).width}
                                height={getImageDimension(tech.Image.filename).height}
                                src={
                                  tech.Grayscale
                                    ? `${tech.Image.filename}/m/filters:grayscale()`
                                    : tech.Image.filename
                                }
                                alt={tech.Image.alt || tech.Image.title || 'Tech Image'}
                              />
                            )}
                          </div>
                        )}
                        {tech.Image?.title && (
                          <p className="tech__details">{tech.Image.title}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Technologies;
