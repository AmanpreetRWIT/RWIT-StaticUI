import React from 'react';

const ComparisonBanner = ({
  BackgroundStyle = 'theme-gradient-3',
  BGColor,
  BannerPadding = 'default',
  TitleColor,
  CmsOne = 'Your Banner Title',
}) => {
  const bannerSpacing = (Padding) => {
    if (Padding === 'Large') return 'large';
    else if (Padding === 'Small') return 'small';
    else if (Padding === 'Medium') return 'medium';
    else return 'default';
  };

  return (
    <div
      id="ComparisonBanner"
      className="compareBanner axil-slider-area axil-slide-activation"
    >
      <div
        className={`compareBanner-container axil-slide slide-style-4 d-flex align-items-center ${BackgroundStyle}`}
        style={BGColor?.color ? { background: BGColor.color } : {}}
      >
        <div
          className={`compareBanner-wrapper container ${bannerSpacing(
            BannerPadding
          )}`}
        >
          <div className="row align-items-center justify-content-center">
            <div className="content text-center">
              <h1
                className="axil-display layer1"
                style={TitleColor?.color ? { color: TitleColor.color } : {}}
              >
                {CmsOne}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBanner;
