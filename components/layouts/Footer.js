import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { getImageDimension, useMobile } from '../../helpers/utilities';
import { usePathname } from 'next/navigation';

const Footer = ({ footerSetting = {} }) => {
  const path = usePathname();
  const isMobile = useMobile();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleDropdownToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };
  const isTechnology =
    path?.split('/').includes('technologies') && isMobile ? 'ft-back' : '';
  const [footerSettings, setFooterSettings] = useState({});
  const { SocialIcons } = footerSetting?.footerData || {};
  const footerData = footerSetting?.footerData || {};
  const footerLocations =
    footerData?.Address?.length > 4
      ? footerData?.Address?.slice(0, 3)
      : footerData?.Address;

  useEffect(() => {
    if (footerSetting === '') {
      const setting = {
        showCopyrightOnly: false,
      };
      setFooterSettings(setting);
    } else {
      setFooterSettings(footerSetting);
    }
  }, [footerSetting]);

  function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
  }

  useEffect(() => {
    const footerMenu = document.querySelectorAll(
      '.footer-menu-container > .ft-menu'
    );

    footerMenu?.forEach((menu) => {
      if (menu.classList.contains('ft-shown')) {
        menu.style.maxHeight = menu.scrollHeight + 'px';
      } else {
        menu.style.maxHeight = null;
      }
    });
  }, [selectedIndex]);
  return (
    <footer
      id="Footer"
      className={`axil-footer footer-default footer-style-3 bg-color-extra09 ${
        footerSettings.showCopyrightOnly ? 'bg-color-lightest' : ''
      }${footerSetting?.footerData?.TextColor} ${
        footerSetting?.StickyFooter ? '' : 'isSticky'
      }`}
      style={
        footerSetting?.footerData?.BGColor
          ? { background: footerSetting?.footerData?.BGColor }
          : {}
      }
    >
      <div
        id={footerData?.FooterLayout}
        className={
          !footerSettings.showCopyrightOnly && footerSettings.style !== 'three'
            ? 'bg_image--2'
            : ''
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
                                    {address?.FlagImage?.filename && (
                                      <Image
                                        src={address?.FlagImage?.filename}
                                        alt={address?.FlagImage?.alt}
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
                                  {address?.PhoneNumber &&
                                    address?.PhoneNumber?.length > 0 && (
                                      <div className="footer__location-phone">
                                        <Link
                                          href={
                                            address?.PhoneNumber[0]?.Link?.url
                                          }
                                          prefetch={false}
                                        >
                                          {address?.PhoneNumber[0]?.Label}
                                        </Link>
                                      </div>
                                    )}
                                </div>
                              ))}
                              {footerData?.Address?.length > 4 &&
                                footerData?.MoreAddressLink && (
                                  <div className="footer__more-link">
                                    <Link
                                      href={
                                        (
                                          footerData?.MoreAddressLink[0]?.Link
                                            ?.story ||
                                          footerData?.MoreAddressLink[0]?.Link
                                        )?.url || '/'
                                      }
                                      prefetch={false}
                                    >
                                      +{footerData?.Address?.length - 3}{' '}
                                      {footerData?.MoreAddressLink[0]?.Label}
                                    </Link>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      )}
                      {footerSetting?.footerData?.FooterCloumn &&
                        footerSetting?.footerData?.FooterCloumn?.filter(
                          (menu) =>
                            footerData?.FooterLayout
                              ? isMobile
                                ? menu
                                : !menu?.ToggleTagLayout
                              : menu
                        )?.map((menu, index, column) => (
                          <div
                            className={'mt_mobile--20'}
                            key={`menu-column-${index}`}
                          >
                            <div
                              className="footer-widget-item widget-wrap"
                              style={
                                index === column.length - 1
                                  ? { border: 'none' }
                                  : {}
                              }
                            >
                              {menu?.ColumnHeading && (
                                <h2
                                  className="title"
                                  onClick={() =>
                                    isMobile ? handleDropdownToggle(index) : ''
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
                                            ? 'rotate(180deg)'
                                            : '',
                                        transition: 'transform 0.5s',
                                      }}
                                    >
                                      <path
                                        fill=""
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
                                        ? 'link-arrow'
                                        : 'link-hover'
                                    } color-var--2 ${
                                      isMobile ? 'list-hide ft-back' : ''
                                    } ${
                                      isMobile && selectedIndex === index
                                        ? 'ft-shown'
                                        : ''
                                    }`}
                                  >
                                    {menu?.Menu &&
                                      menu?.Menu?.map((menuItem, index) => (
                                        <li key={`footer-service-${index}`}>
                                          <Link
                                            href={
                                              menuItem?.Link?.story?.url !==
                                              undefined
                                                ? '/' +
                                                  menuItem?.Link?.story?.url
                                                : menuItem?.Link?.url
                                            }
                                            target={menuItem?.Link?.target}
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
                    {footerData?.FooterLayout && !isMobile && (
                      <div className="footer-menu-tabs">
                        {footerSetting?.footerData?.FooterCloumn &&
                          footerSetting?.footerData?.FooterCloumn?.filter(
                            (menu) => menu?.ToggleTagLayout
                          )?.map((menu, index, column) => (
                            <div
                              className={'mt_mobile--20 footer-menu-tab'}
                              key={`menu-column-${index}`}
                            >
                              <div
                                className="footer-widget-item widget-wrap"
                                style={
                                  index === column.length - 1
                                    ? { border: 'none' }
                                    : {}
                                }
                              >
                                {menu?.ColumnHeading && (
                                  <h2
                                    className="title"
                                    onClick={() =>
                                      isMobile
                                        ? handleDropdownToggle(index)
                                        : ''
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
                                              ? 'rotate(180deg)'
                                              : '',
                                          transition: 'transform 0.5s',
                                        }}
                                      >
                                        <path
                                          fill=""
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
                                      className={`ft-menu liststyle color-var--2 ${
                                        isMobile ? 'list-hide ft-back' : ''
                                      } ${
                                        isMobile && selectedIndex === index
                                          ? 'ft-shown'
                                          : ''
                                      }`}
                                    >
                                      {menu?.Menu &&
                                        menu?.Menu?.map((menuItem, index) => (
                                          <li
                                            style={{
                                              color:
                                                footerData?.FooterLinkTagColor
                                                  ,
                                              backgroundColor:
                                                footerData?.FooterLinkTagBgColor
                                                  ?.color,
                                            }}
                                            key={`footer-service-${index}`}
                                          >
                                            <Link
                                              href={
                                                menuItem?.Link?.story?.url !==
                                                undefined
                                                  ? '/' +
                                                    menuItem?.Link?.story?.url
                                                  : menuItem?.Link?.url
                                              }
                                              prefetch={false}
                                              target={menuItem?.Link?.target}
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
                    )}
                  </div>
                </div>

                {footerSetting?.footerData?.PartnerLabel && (
                  <div className="footer_logo-title">
                    <p>{footerSetting?.footerData?.PartnerLabel}</p>
                  </div>
                )}
                {footerSetting?.footerData?.Images &&
                  footerSetting?.footerData?.Images.length > 0 && (
                    <div className="footer_logo">
                      {footerSetting?.footerData?.Images &&
                        footerSetting?.footerData?.Images?.map(
                          (item, index) => (
                            <div
                              className={`footer_logo_item ${item?.Image?.source}`}
                              key={`image-${index}`}
                            >
                              {item?.ImageLink?.url ||
                              item?.ImageLink?.story?.url ? (
                                <Link
                                  href={
                                    item?.ImageLink?.url ||
                                    item?.ImageLink?.story?.url
                                  }
                                  rel="noopener noreferrer"
                                  prefetch={false}
                                  target={item?.ImageLink?.url ? '_blank' : ''}
                                >
                                  {item?.Image?.filename && (
                                    <Image
                                      loading="lazy"
                                      width={
                                        getImageDimension(item?.Image?.filename)
                                          .width
                                      }
                                      height={
                                        getImageDimension(item?.Image?.filename)
                                          .height
                                      }
                                      className="image w-100"
                                      src={
                                        item?.Grayscale
                                          ? `${item?.Image?.filename}/m/filters:grayscale()`
                                          : item?.Image?.filename
                                      }
                                      alt={
                                        item?.Image?.alt
                                          ? item?.Image?.alt
                                          : 'image'
                                      }
                                    />
                                  )}
                                </Link>
                              ) : (
                                <span>
                                  {item?.Image?.filename && (
                                    <Image
                                      loading="lazy"
                                      width={
                                        getImageDimension(item?.Image?.filename)
                                          .width
                                      }
                                      height={
                                        getImageDimension(item?.Image?.filename)
                                          .height
                                      }
                                      className="image w-100"
                                      src={
                                        item?.Grayscale
                                          ? `${item?.Image?.filename}/m/filters:grayscale()`
                                          : item?.Image?.filename
                                      }
                                      alt={
                                        item?.Image?.alt
                                          ? item?.Image?.alt
                                          : 'image'
                                      }
                                    />
                                  )}
                                </span>
                              )}
                            </div>
                          )
                        )}
                    </div>
                  )}
              </div>
            </div>
          </>
        )}

        <div
          className={`copyright copyright-default ${footerSetting?.footerData?.TextColor}`}
        >
          <div className="container">
            <div className="footer__bottom ptb--25 axil-basic-thine-line">
              <div>
                {SocialIcons && SocialIcons.length > 0 && (
                  <div className="socail">
                    <div className="socail_icons">
                      {SocialIcons &&
                        SocialIcons?.map((item, index) => (
                          <div className="socail_icon" key={`image-${index}`}>
                            {item?.ImageLink?.url ||
                            item?.ImageLink?.story?.url ? (
                              <Link
                                href={
                                  item?.ImageLink?.url ||
                                  item?.ImageLink?.story?.url
                                }
                                rel="noopener noreferrer"
                                prefetch={false}
                                target={item?.ImageLink?.url ? '_blank' : ''}
                              >
                                {item?.Image?.filename && (
                                  <Image
                                    loading="lazy"
                                    width={24}
                                    height={24}
                                    className="image w-100"
                                    src={
                                      item?.Grayscale
                                        ? `${item?.Image?.filename}/m/filters:grayscale()`
                                        : item?.Image?.filename
                                    }
                                    alt={
                                      item?.Image?.alt
                                        ? item?.Image?.alt
                                        : 'icon'
                                    }
                                  />
                                )}
                              </Link>
                            ) : (
                              <>
                                {item?.Image?.filename && (
                                  <Image
                                    loading="lazy"
                                    width={24}
                                    height={24}
                                    className="image w-100"
                                    src={
                                      item?.Grayscale
                                        ? `${item?.Image?.filename}/m/filters:grayscale()`
                                        : item?.Image?.filename
                                    }
                                    alt={
                                      item?.Image?.alt
                                        ? item?.Image?.alt
                                        : 'icon'
                                    }
                                  />
                                  
                                )}
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {footerSetting?.footerData?.CopyrightText && (
                  <div
                    className={`inner text-center text-md-start link-hover ${
                      isMobile ? 'ft-back' : ''
                    }`}
                  >
                    <div className="footer__copyright">
                      <p> © 2012 - {getCurrentYear()} </p>
                      {(footerSetting?.footerData?.CopyrightText)}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="quick-contact">
                  <ul
                    className={`link-hover d-flex justify-content-center justify-content-md-end liststyle color-var--2 ${
                      isMobile ? 'ft-back' : ''
                    }`}
                  >
                    {footerSetting?.footerData?.CopyrightLinks &&
                      footerSetting?.footerData?.CopyrightLinks?.map(
                        (item, index) => (
                          <li key={`menu-${index}`}>
                            <Link
                              data-hover={item?.Label}
                              href={
                                item?.Link?.story?.url !== undefined
                                  ? '/' + item?.Link?.story?.url
                                  : item?.Link?.url
                              }
                              target={item?.Link?.target}
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
