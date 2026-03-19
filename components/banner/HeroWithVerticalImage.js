// HeroWithVerticalImage.js
import Image from "next/legacy/image";
import { placeholderLight } from "../../helpers/utilities";

const HeroWithVerticalImage = ({
  title,
  titleColor,
  heading,
  headingColor,
  description,
  descriptionColor,
  buttons,
  bgColor,
  showButtons,
  gradientStyle = "theme-gradient-3",
  imageOnTop = false,
  bannerImage,
  textAlignment
}) => {
  return (
    <div className="axil-slider-area axil-slide-activation">
      <div
        className={`axil-slide slide-style-4 ${gradientStyle} d-flex align-items-center pt--80 pb--80 pt_sm--40 pt_md--40 pb_sm--30`}
        style={bgColor ? { background: bgColor } : {}}
      >
        <div className="container position-relative">
          <div
            className={`d-flex ${
              imageOnTop ? "flex-column-reverse" : "flex-column"
            } gap-2 gap-lg-5 gap-md-2 row align-items-center`}
          >
            {/* Left Content */}
            <div className="col-lg-8 col-12 order-2 order-lg-1 mt_md--40 mt_sm--30">
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
                  <h2
                    className="axil-display-1 layer1 custom-h1"
                    style={headingColor ? { color: headingColor } : {}}
                  >
                    {heading}
                  </h2>
                )}

                {description && (
                  <div
                    className="layer2 custom-color"
                    style={descriptionColor ? { color: descriptionColor } : {}}
                  >
                    {description}
                  </div>
                )}

                {showButtons && buttons?.length > 0 && (
                  <div className="slider-button gap-4 d-flex justify-content-center">
                       <a
                       className="hoverable axil-button  axil-button btn-solid 
                  btn-solid 
                  btn-large "
                       target=""
                       href={buttons?.href || "#"}
                     >
                       <span className="button-text hoverable px-0">
                         {buttons?.label}
                       </span>
                     </a>
                  </div>
                )}
              </div>
            </div>
            {/* Right Image */}
            {bannerImage?.src && (
              <div className="col-lg-12 col-12 order-2 order-lg-1 mt_md--40 mt_sm--30">
                <div className="d-flex col-12">
                  <div className="image col-12 mw-100 w-100 d-flex align-center justify-content-center align-items-center">
                    <Image
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={placeholderLight}
                      width={bannerImage.width || 1260}
                      height={bannerImage.height || 500}
                      className="object-fit-cover"
                      src={bannerImage.src}
                      alt={bannerImage.alt || "banner-image"}
                      style={{ objectFit: "cover", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithVerticalImage;
