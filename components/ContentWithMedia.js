import Image from 'next/legacy/image';
import VideoPlayer from '../components/common/VideoPlayer';
import { useState } from 'react';

const ContentWithMedia = ({
  layoutType,
  gradientStyle,
  bgColor,
  disableBgShape,
  image,
  video,
  tags,
  title,
  titleColor,
  description,
  descriptionColor,
  buttons,
}) => {
  const [isWindow, setIsWindow] = useState(false);

  const layout = (Layout) => {
    if (Layout === 'flex-row')
      return 'col-lg-6 col-xl-6 col-md-12 col-12  mt_md--30 mt_sm--30';
    else if (Layout === 'style-2')
      return 'col-lg-6 col-xl-6 offset-xl-1 col-md-12 col-12 order-1 order-lg-2';
    else if (Layout === 'flex-column') return 'col-lg-8 offset-lg-2 ';
    else if (Layout === 'flex-column-reverse') return 'col-lg-8 offset-lg-2';
    else return '';
  };

  const InnerLayout = (Layout) => {
    if (Layout === 'flex-row')
      return 'col-lg-6 col-xl-5 offset-xl-1 col-md-12 col-12';
    else if (Layout === 'style-2')
      return 'col-lg-6 col-xl-5 col-md-12 col-12 order-2 order-lg-1 mt_md--30 mt_sm--30';
    else if (Layout === 'flex-column') return 'col-lg-8 offset-lg-2';
    else if (Layout === 'flex-column-reverse') return 'col-lg-8 offset-lg-2';
    else return '';
  };

  return (
    <div>
      <div
        className={`axil-project-brief project-bief-styles ax-section-gap bg-color-white ${
          gradientStyle || 'theme-gradient-3'
        } ${layoutType === 'style-2' ? 'order-style-2' : ''}`}
        style={bgColor ? { background: bgColor } : {}}
      >
        <div className="container">
          <div
            className={`row ${layoutType} ${
              layoutType !== 'flex-column' && layoutType !== 'flex-column-reverse'
                ? 'align-items-center'
                : ''
            }`}
          >
            {(image?.filename || video?.filename) && (
              <div className={`${layout(layoutType)} content-media`}>
                {image?.filename && (
                  <div className="thumbnail position-relative mt--30 mb--30 thumbnail-img">
                    <Image
                      loading="lazy"
                      width={700}
                      height={530}
                      className="image w-100 paralax-image"
                      src={image.filename}
                      alt={image.alt ? image.alt : 'blog image'}
                    />
                    {video?.filename && (
                      <div className="video-button position-to-top">
                        <a
                          className="play__btn video-btn"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <span className="triangle" />
                        </a>
                      </div>
                    )}

                    {!disableBgShape && (
                      <div>
                        <div className="shape-group shape-01">
                          <Image
                            loading="lazy"
                            width={257}
                            height={179}
                            src="/images/contact-01.svg"
                            alt="Shape image"
                          />
                        </div>
                        <div className="shape-group shape-02">
                          <Image
                            loading="lazy"
                            width={410}
                            height={424}
                            src="/images/contact-03.svg"
                            alt="Shape image"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div
              className={`content__wrap ${
                image?.filename || video?.filename
                  ? InnerLayout(layoutType)
                  : 'col-lg-12'
              }`}
            >
              <div className="content">
                {tags && (
                  <div className="section-title tag">
                    {Array.isArray(tags)
                      ? tags.map((tag, index) => (
                          <span key={index} className="tag-item">
                            {tag.name}
                          </span>
                        ))
                      : null}
                  </div>
                )}
                <div className="inner">
                  {title && (
                    <h2
                      style={titleColor ? { color: titleColor } : {}}
                      className="title mb--20"
                    >
                      {title}
                    </h2>
                  )}

                  {description && (
                    <div
                      className="custom-color desc"
                      style={descriptionColor ? { color: descriptionColor } : {}}
                    >
                      {(description)}
                    </div>
                  )}

                  {buttons && (
                    <div className="axil-button-group mt--40">
                      {buttons.map((btn, index) => (
                        <a
                          key={index}
                          href={btn.href}
                          className={`axil-btn ${btn.style || 'btn-primary'}`}
                        >
                          {btn.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isWindow && video?.filename && <VideoPlayer url={video.filename} />}
    </div>
  )
};

export default ContentWithMedia;
