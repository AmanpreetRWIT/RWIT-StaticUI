import Image from "next/legacy/image";
import SectionTitle from "../common/SectionTitle";
import Link from "next/link";
import { getImageDimension } from "../../helpers/utilities";

const Team = ({ data }) => {
  return (
    <div
      className={`ax-section-gap--lg axil-team-area shape-position bg-color-white ${
        data?.showImageOnRight ? "rightSide" : ""
      }`}
      style={data?.bgColor ? { background: data.bgColor } : {}}
    >
      <div className="container">
        <div className="row">
          {data?.image && (
            <div className="col-lg-6 col-xl-6 position-relative">
              <div className="thumbnail">
                <div className="image">
                  <Image
                    loading="lazy"
                    width={getImageDimension(data?.image, 630, 514).width}
                    height={getImageDimension(data?.image, 630, 514).height}
                    src={
                      data?.grayscale
                        ? `${data?.image}/m/filters:grayscale()`
                        : data?.image
                    }
                    alt={data?.alt || "Team"}
                  />
                </div>

                {data?.teamNumbers && (
                  <div className="total-team-button">
                    {data.teamNumbers.map((item, index) => (
                      <div className="team-number-item" key={`team-link-${index}`}>
                        <Link href={item.link || "#"} legacyBehavior>
                          <a target={item.target || "_self"}>
                            <span className="team-number">{item.number}</span>
                            <span className="team-text">{item.text}</span>
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!data?.disableBgShape && (
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
              data?.image
                ? "col-lg-5 col-xl-5 offset-xl-1 mt_md--40 mt_sm--40"
                : "col-lg-12"
            }`}
          >
            <div className="content">
              <div className="inner">
                <SectionTitle
                  title={data?.heading}
                  subtitle={data?.tags}
                  description={data?.description}
                  titleColor={data?.headingColor || ""}
                  descriptionColor={data?.descriptionColor || ""}
                  alignment="left"
                  showTags={data?.showTags}
                />

                {data?.buttons && (
                  <div className="axil-button-group mt--40">
                    {data?.buttons?.map((btn, index) => (
                      <Link href={btn.link || "#"} key={`btn-${index}`} legacyBehavior>
                        <a className={`axil-btn btn-${btn.type || "primary"}`}>
                          {btn.text}
                        </a>
                      </Link>
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
