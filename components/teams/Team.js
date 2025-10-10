import Image from "next/legacy/image";
import SectionTitle from '../common/SectionTitle';
import Link from 'next/link';
import { getImageDimension } from '../../helpers/utilities';
import { StoryblokComponent } from '@storyblok/react';

const Team = ({ blok }) => {
  return (
    <div
      className={`ax-section-gap--lg axil-team-area shape-position bg-color-white ${
        blok?.ShowImageOnRight ? 'rightSide' : ''
      }`}
      style={blok?.BgColor?.color ? { background: blok?.BgColor?.color } : {}}
    >
      <div className="container">
        <div className="row">
          {blok?.Image?.filename && (
            <div className="col-lg-6 col-xl-6 position-relative">
              <div className="thumbnail">
                <div className="image">
                  <Image
                    loading="lazy"
                    width={
                      getImageDimension(blok?.Image?.filename, 630, 514).width
                    }
                    height={
                      getImageDimension(blok?.Image?.filename, 630, 514).height
                    }
                    src={
                      blok.Grayscale
                        ? `${blok?.Image?.filename}/m/filters:grayscale()`
                        : blok?.Image?.filename
                    }
                    alt={blok?.Image?.alt ? blok?.Image?.alt : 'Team'}
                  />
                </div>

                {blok?.TeamNumbers && (
                  <div className="total-team-button">
                    {blok?.TeamNumbers.map((link, linkIndex) => (
                      <StoryblokComponent
                        blok={link}
                        key={'team-link-' + linkIndex}
                      />
                    ))}
                  </div>
                )}
              </div>
              {!blok?.DisableBgShape && (
                <div className="shape-group">
                  <div className="shape shape-1 customOne">
                    <i className="icon icon-shape-06"></i>
                  </div>
                  <div className="shape shape-2">
                    <i className="icon icon-shape-13"></i>
                  </div>
                  <div className="shape shape-3">
                    <i className="icon icon-shape-14"></i>
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className={`${
              blok?.Image?.filename
                ? '  col-lg-5 col-xl-5 offset-xl-1 mt_md--40 mt_sm--40'
                : 'col-lg-12'
            }`}
          >
            <div className="content">
              <div className="inner">
                <SectionTitle
                  title={blok?.Heading}
                  subtitle={blok?.Tags}
                  description={blok?.Description}
                  titleColor={blok?.HeadingColor?.color ? blok?.HeadingColor?.color : ''}
                  descriptionColor ={blok?.DescriptionColor?.color ? blok?.DescriptionColor?.color : ""}
                  alignment="left"
                />
                {blok.Buttons && (
                  <div className="axil-button-group mt--40">
                    {blok.Buttons &&
                      blok.Buttons.map((Button, index) => (
                        <StoryblokComponent
                          blok={Button}
                          key={'block' + index}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
