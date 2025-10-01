// HeroWithoutImage.js
import React from "react";

const HeroWithoutImage = ({
  title,
  titleColor,
  heading,
  headingColor,
  description,
  descriptionColor,
  fontSize,
  gradientStyle = "theme-gradient-3",
  removeExtraPadding = false,
  buttons,
  showButtons,
  hideScrollToBottomIcon = false,
}) => {
  const headingFont = (fontStyle) => {
    switch (fontStyle) {
      case "small":
        return "smallFont";
      case "medium":
        return "mediumfont";
      case "large":
        return "";
      default:
        return "";
    }
  };

  return (
    <div id="HeroWithoutImage" className="axil-slider-area axil-slide-activation">
      <div
        className={`axil-slide slide-style-4 ${gradientStyle} d-flex align-items-center pt--80 pb--80 pt_sm--40 pt_md--40 pb_sm--20`}
      >
        <div
          className={`container position-relative ${
            removeExtraPadding
              ? "pt--40"
              : "pt--80 pb--80 pt_sm--40 pt_md--40 pb_sm--40"
          }`}
        >
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12 col-12 order-2 order-lg-1 mt_md--40 mt_sm--30">
              <div className="content text-center">
                {title && (
                  <span
                    className="title"
                    style={titleColor ? { color: titleColor } : {}}
                  >
                    {title}
                  </span>
                )}

                {heading && (
                  <h1
                    className={`axil-display-1 layer1 axil-display-2 ${headingFont(
                      fontSize
                    )}`}
                    style={headingColor ? { color: headingColor } : {}}
                  >
                    {heading}
                  </h1>
                )}

                {description && (
                  <div
                    className="layer2 custom custom-color layer3"
                    style={descriptionColor ? { color: descriptionColor } : {}}
                  >
                    <p>{description}</p>
                  </div>
                )}

                {showButtons && buttons.length > 0 && (
                  <div className="slider-button gap-4 d-flex justify-content-center">
                    {buttons.map((button, index) => (
                      <button
                        key={index}
                        className="btn btn-primary"
                        onClick={button.onClick}
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                )}

                {hideScrollToBottomIcon && (
                  <div className="scroll-down_btn">
                    <a
                      id="scrollDown"
                      className="axil-scrollbown smoth-animation pointer-event"
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                    >
                      <span></span>
                    </a>
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

export default HeroWithoutImage;
