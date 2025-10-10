import Image from "next/legacy/image";
import Link from 'next/link';
import { getImageDimension } from '../../helpers/utilities';
import { StoryblokComponent } from '@storyblok/react';

import { useState } from 'react';

export const Technologies = ({ blok }) => {
  const [isActive, setisActive] = useState(0);

  const accordiaonToggle = (index) => {
    if (isActive === index) {
      setisActive(null);
    } else {
      setisActive(index);
    }
  };
  const RowTitleColor = blok?.RowTitleColor?.color  ? blok?.RowTitleColor?.color : "";

  return (
    <div
      className="tech ax-section-gap"
      style={{
        background: blok?.BGColor?.color ? blok?.BGColor?.color : {},
      }}
    >
      <div
        className={`container`}
      >
        {blok?.Tags && (
          <div className="section-title tag">
            {blok?.Tags && Array.isArray(blok?.Tags)
              ? blok?.Tags?.map((tag, index) => (
                  <StoryblokComponent blok={tag} key={index} />
                ))
              : null}
          </div>
        )}

        {blok?.Title && (
          <h2
            className={`title tech__sticky`}
            style={{
              background: blok?.BGColor?.color ? blok?.BGColor?.color : {},
               color: blok?.TitleColor?.color ? blok?.TitleColor?.color : {},
            }}
          >
            {blok?.Title ? blok?.Title : ""}
          </h2>
        )}

        {blok?.Technologies &&
          blok?.Technologies.map((item, index) => (
            <div
              className={`tech__wrap ${isActive == index ? 'mb-0' : ''}`}
              key={`tech${index}`}
            >
              <div className="tech__content">
                <div
                  className={`tech__content__wrap ${
                    isActive == index ? 'rotate' : ''
                  }`}
                  onClick={() => accordiaonToggle(index)}
                >
                  {item?.RowHeading && (
                    <h3 style={RowTitleColor ? {color : RowTitleColor} : {}} className="tech__content__title">{item?.RowHeading}</h3>
                  )}
                </div>

                <div
                  className={`tech__items ${isActive == index ? 'show' : ''}`}
                >
                  {item?.RowImage && item?.RowHeading &&
                    item?.RowImage.map((tech, index) => (
                      <div className="tech__item" key={`image-${index}`}>
                        {tech.Image.filename && (
                          <div className="tech__icon">
                            {tech?.ImageLink?.story?.url ||
                            tech?.ImageLink?.url ? (
                              <Link
                                href={
                                  tech?.ImageLink?.story?.url ||
                                  tech?.ImageLink?.url ||
                                  '#'
                                }
                                legacyBehavior
                              >
                                <a>
                                  <Image
                                    loading="lazy"
                                    width={
                                      getImageDimension(tech?.Image?.filename)
                                        .width
                                    }
                                    height={
                                      getImageDimension(tech?.Image?.filename)
                                        .height
                                    }
                                    src={
                                      tech?.Grayscale
                                        ? `${tech?.Image?.filename}/m/filters:grayscale()`
                                        : tech?.Image?.filename
                                    }
                                    alt={
                                      tech?.Image?.alt
                                        ? tech.Image.alt
                                        : tech?.Image?.title
                                    }
                                  />
                                </a>
                              </Link>
                            ) : (
                              <Image
                                loading="lazy"
                                width={
                                  getImageDimension(tech?.Image?.filename).width
                                }
                                height={
                                  getImageDimension(tech?.Image?.filename)
                                    .height
                                }
                                src={
                                  tech?.Grayscale
                                    ? `${tech?.Image?.filename}/m/filters:grayscale()`
                                    : tech?.Image?.filename
                                }
                                alt={
                                  tech?.Image?.alt
                                    ? tech.Image.alt
                                    : tech?.Image?.title
                                }
                              />
                            )}
                          </div>
                        )}
                        {tech?.Image?.title && (
                          <p className="tech__details">{tech?.Image?.title}</p>
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
