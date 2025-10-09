import Link from "next/link";
import SectionTitle from "../common/SectionTitle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CallToAction = ({
  heading = "",
  description = "",
  tags = [],
  titleColor = "",
  descriptionColor = "",
  bgColor = "",
  backgroundImage = "",
  minHeight = 0,
  buttons = [],
  phone = [],
  showPhone=true,
  showTags=true,
  disableBgShape = false,
  Sectiontitle = true,
}) => {
  const router = useRouter();
  const [isThankYouPage, setIsThankYouPage] = useState(false);

  useEffect(() => {
    if (router.asPath === "/thank-you") {
      setIsThankYouPage(true);
    }
  }, [router.asPath]);

  return (
    <div
      className="axil-call-to-action-area shape-position ax-section-gap d-flex align-items-center"
      style={{
        minHeight: minHeight ? `${minHeight}px` : "",
        backgroundColor: bgColor || "",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
        backgroundSize: backgroundImage ? "" : "",
        backgroundPosition: backgroundImage ? "center" : "",
        backgroundRepeat: backgroundImage ? "no-repeat" : "",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="axil-call-to-action position-relative">
              {Sectiontitle && (
                <SectionTitle
                  titleClass={
                    isThankYouPage
                      ? "mb-4 submission"
                      : description
                      ? "mb-4"
                      : ""
                  }
                  title={heading}
                  subtitle={tags}
                  alignment="center"
                  titleColor={titleColor}
                  showTags={showTags}
                />
              )}

              {description && (
                <p
                  style={descriptionColor ? { color: descriptionColor } : {}}
                  className="text-description"
                >
                  {description}
                </p>
              )}

              <div className="text-center">
                {Sectiontitle && (
                  <a
                    class="hoverable axil-button meeting_btn   
        btn-solid 
          "
                    target="_blank"
                    href="https://calendly.com/jimmynarula/introductory-meeting"
                  >
                    <span class="button-text hoverable ">{buttons.label}</span>
                    <span class="fas fa-external-link-alt"></span>
                  </a>
                )}

                {showPhone && phone?.map((ph, index) => (
                  <div className="callto-action" key={index}>
                    <span className="text">Or call us now</span>
                    <span>
                      <i className="fal fa-phone-alt" />
                      <Link href={ph.href}>
                        <p>{ph.label}</p>
                      </Link>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!disableBgShape && (
        <div className="shape-group">
          <div className="shape shape-01">
            <i className="icon icon-shape-14" />
          </div>
          <div className="shape shape-02">
            <i className="icon icon-shape-09" />
          </div>
          <div className="shape shape-03">
            <i className="icon icon-shape-10" />
          </div>
          <div className="shape shape-04">
            <i className="icon icon-shape-11" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CallToAction;