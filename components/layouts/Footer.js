import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { getImageDimension, useMobile } from "../../helpers/utilities";
import { usePathname } from "next/navigation";

const Footer = ({ footerSetting = {} }) => {
  const path = usePathname();
  const isMobile = useMobile();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDropdownToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const isTechnology =
    path?.split("/").includes("technologies") && isMobile ? "ft-back" : "";

  const [footerSettings, setFooterSettings] = useState({});
  const { SocialIcons } = footerSetting || {};
  const footerData = footerSetting || {};

  const footerLocations =
    footerData?.Address?.length > 4
      ? footerData?.Address?.slice(0, 3)
      : footerData?.Address;

  useEffect(() => {
    if (footerSetting === "") {
      setFooterSettings({ showCopyrightOnly: false });
    } else {
      setFooterSettings(footerSetting);
    }
  }, [footerSetting]);

  function getCurrentYear() {
    return new Date().getFullYear();
  }

  useEffect(() => {
    const footerMenu = document.querySelectorAll(
      ".footer-menu-container > .ft-menu"
    );

    footerMenu?.forEach((menu) => {
      if (menu.classList.contains("ft-shown")) {
        menu.style.maxHeight = menu.scrollHeight + "px";
      } else {
        menu.style.maxHeight = null;
      }
    });
  }, [selectedIndex]);

  return (
    <footer
      id="Footer"
      className={`axil-footer footer-default footer-style-3 bg-color-extra09 ${
        footerSettings.showCopyrightOnly ? "bg-color-lightest" : ""
      } ${footerSetting?.TextColor} ${
        footerSetting?.StickyFooter ? "" : "isSticky"
      }`}
      style={
        footerSetting?.BGColor
          ? { background: footerSetting?.BGColor }
          : {}
      }
    >
      <div
        id={footerData?.FooterLayout}
        className={
          !footerSettings.showCopyrightOnly && footerSettings.style !== "three"
            ? "bg_image--2"
            : ""
        }
      >
        {!footerSettings.showCopyrightOnly && (
          <>
            <div className="footer-top">
              <div className="container">
                <div className="row">
                  <div>
                    <div className="footer__menu">
                      {footerData?.FooterLayout && (
                        <div className="footer-widget-item footer__locations">
                          {footerData?.AddressHeading && (
                            <h2 className="title">
                              {footerData?.AddressHeading}
                            </h2>
                          )}

                          {footerLocations?.length > 0 && (
                            <div className="footer__locations-list">
                              {footerLocations?.map((address, idx) => (
                                <div className="footer__location" key={idx}>
                                  <div className="footer__location-heading">
                                    {address?.FlagImage && (
                                      <Image
                                        src={address?.FlagImage?.filename || address?.FlagImage}
                                        alt={address?.FlagImage?.alt || "flag"}
                                        width={31}
                                        height={20}
                                        className="footer__location-flag"
                                      />
                                    )}
                                    {address?.AddressHeading && (
                                      <p className="footer__location-country">
                                        {address.AddressHeading}
                                      </p>
                                    )}
                                  </div>

                                  {address?.FullAddress && (
                                    <div className="footer__location-address">
                                      {address?.FullAddress}
                                    </div>
                                  )}

                                  {address?.PhoneNumber?.length > 0 && (
                                    <div className="footer__location-phone">
                                      <Link
                                        href={address?.PhoneNumber[0]?.Link}
                                        prefetch={false}
                                      >
                                        {address?.PhoneNumber[0]?.Label}
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {footerSetting?.FooterCloumn &&
                        footerSetting?.FooterCloumn?.filter(
                          (menu) =>
                            footerData?.FooterLayout
                              ? isMobile
                                ? menu
                                : !menu?.ToggleTagLayout
                              : menu
                        )?.map((menu, index, column) => (
                          <div
                            className={"mt_mobile--20"}
                            key={`menu-column-${index}`}
                          >
                            <div
                              className="footer-widget-item widget-wrap"
                              style={
                                index === column.length - 1
                                  ? { border: "none" }
                                  : {}
                              }
                            >
                              {menu?.ColumnHeading && (
                                <h2
                                  className="title"
                                  onClick={() =>
                                    isMobile ? handleDropdownToggle(index) : ""
                                  }
                                >
                                  {menu?.ColumnHeading}
                                  {isMobile && (
                                    <svg
                                      width="12"
                                      height="7"
                                      viewBox="0 0 12 7"
                                      strokeWidth="2"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{
                                        transform:
                                          selectedIndex === index
                                            ? "rotate(180deg)"
                                            : "",
                                        transition: "transform 0.5s"
                                      }}
                                    >
                                      <path
                                        d="M10.1667 1.83333L6.00004 6L1.83337 1.83333"
                                        stroke="#fff"
                                      />
                                    </svg>
                                  )}
                                </h2>
                              )}

                              {menu?.Menu && (
                                <div className="footer-menu-container">
                                  <ul
                                    className={`ft-menu liststyle ${
                                      footerData?.FooterLayout
                                        ? "link-arrow"
                                        : "link-hover"
                                    } color-var--2 ${
                                      isMobile ? "list-hide ft-back" : ""
                                    } ${
                                      isMobile && selectedIndex === index
                                        ? "ft-shown"
                                        : ""
                                    }`}
                                  >
                                    {menu?.Menu?.map((menuItem, idx) => (
                                      <li key={`footer-service-${idx}`}>
                                        <Link
                                          href={menuItem?.Link}
                                          target="_self"
                                          prefetch={false}
                                        >
                                          {menuItem?.Label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {footerSetting?.PartnerLabel && (
                  <div className="footer_logo-title">
                    <p>{footerSetting?.PartnerLabel}</p>
                  </div>
                )}

                {footerSetting?.Images?.length > 0 && (
                  <div className="footer_logo">
                    {footerSetting?.Images?.map((item, index) => (
                      <div
                        className={`footer_logo_item`}
                        key={`image-${index}`}
                      >
                        <Link
                          href={item?.ImageLink || "#"}
                          rel="noopener noreferrer"
                          prefetch={false}
                          target="_blank"
                        >
                          {item?.Image && (
                            <Image
                              loading="lazy"
                              width={getImageDimension(item?.Image?.filename || item?.Image).width}
                              height={getImageDimension(item?.Image?.filename || item?.Image).height}
                              className="image w-100"
                              src={item?.Image?.filename || item?.Image}
                              alt={item?.Image?.alt || "footer-logo"}
                            />
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div
          className={`copyright copyright-default ${footerSetting?.TextColor}`}
        >
          <div className="container">
            <div className="footer__bottom ptb--25 axil-basic-thine-line">
              <div>
                {SocialIcons && SocialIcons.length > 0 && (
                  <div className="socail">
                    <div className="socail_icons">
                      {SocialIcons.map((item, index) => (
                        <div className="socail_icon" key={`icon-${index}`}>
                          <Link
                            href={item?.ImageLink}
                            rel="noopener noreferrer"
                            prefetch={false}
                            target="_blank"
                          >
                            <Image
                              loading="lazy"
                              width={24}
                              height={24}
                              className="image w-100"
                              src={item?.Image?.filename || item?.Image}
                              alt={item?.Image?.alt || "social-icon"}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {footerSetting?.CopyrightText && (
                  <div
                    className={`inner text-center text-md-start link-hover ${
                      isMobile ? "ft-back" : ""
                    }`}
                  >
                    <div className="footer__copyright">
                      <p> © 2012 - {getCurrentYear()} </p>
                      <p>{footerSetting?.CopyrightText}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="quick-contact">
                  <ul
                    className={`link-hover d-flex justify-content-center justify-content-md-end liststyle color-var--2 ${
                      isMobile ? "ft-back" : ""
                    }`}
                  >
                    {footerSetting?.CopyrightLinks?.map(
                      (item, index) => (
                        <li key={`menu-${index}`}>
                          <Link
                            data-hover={item?.Label}
                            href={item?.Link}
                            target="_self"
                            prefetch={false}
                          >
                            {item?.Label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;