import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { getImageDimension, useMobile } from '../../helpers/utilities';

const Footer = ({ footerData = {} }) => {
  const isMobile = useMobile();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleDropdownToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const footerLocations =
    footerData?.Address?.length > 4
      ? footerData?.Address?.slice(0, 3)
      : footerData?.Address;

  function getCurrentYear() {
    return new Date().getFullYear();
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
        footerData?.showCopyrightOnly ? 'bg-color-lightest' : ''
      } ${footerData?.TextColor || ''} ${footerData?.StickyFooter ? '' : 'isSticky'}`}
      style={footerData?.BGColor ? { background: footerData.BGColor } : {}}
    >
      <div id={footerData?.FooterLayout}>
        {!footerData?.showCopyrightOnly && (
          <>
            <div className="footer-top">
              <div className="container">
                <div className="row">
                  <div>
                    <div className="footer__menu">
                      {footerData?.FooterLayout && (
                        <div className="footer-widget-item footer__locations">
                          {footerData?.AddressHeading && (
                            <h2 className="title">{footerData.AddressHeading}</h2>
                          )}
                          {footerLocations?.length > 0 && (
                            <div className="footer__locations-list">
                              {footerLocations.map((address, idx) => (
                                <div className="footer__location" key={idx}>
                                  <div className="footer__location-heading">
                                    {address?.FlagImage && (
                                      <Image
                                        src={address.FlagImage.filename}
                                        alt={address.FlagImage.alt || ''}
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
                                      {address.FullAddress}
                                    </div>
                                  )}
                                  {address?.PhoneNumber?.length > 0 && (
                                    <div className="footer__location-phone">
                                      <Link href={address.PhoneNumber[0].Link}>
                                        {address.PhoneNumber[0].Label}
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              ))}
                              {footerData?.Address?.length > 4 &&
                                footerData?.MoreAddressLink && (
                                  <div className="footer__more-link">
                                    <Link href={footerData.MoreAddressLink[0].Link || '/'}>
                                      +{footerData.Address.length - 3}{' '}
                                      {footerData.MoreAddressLink[0].Label}
                                    </Link>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      )}

                      {footerData?.FooterCloumn?.map((menu, index, column) => (
                        <div className={'mt_mobile--20'} key={`menu-column-${index}`}>
                          <div
                            className="footer-widget-item widget-wrap"
                            style={index === column.length - 1 ? { border: 'none' } : {}}
                          >
                            {menu?.ColumnHeading && (
                              <h2
                                className="title"
                                onClick={() =>
                                  isMobile ? handleDropdownToggle(index) : ''
                                }
                              >
                                {menu.ColumnHeading}
                              </h2>
                            )}
                            {menu?.Menu && (
                              <div className="footer-menu-container">
                                <ul
                                  className={`ft-menu liststyle ${
                                    isMobile ? 'list-hide ft-back' : ''
                                  } ${isMobile && selectedIndex === index ? 'ft-shown' : ''}`}
                                >
                                  {menu.Menu.map((menuItem, idx) => (
                                    <li key={`footer-service-${idx}`}>
                                      <Link href={menuItem.Link}>{menuItem.Label}</Link>
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

                {footerData?.PartnerLabel && (
                  <div className="footer_logo-title">
                    <p>{footerData.PartnerLabel}</p>
                  </div>
                )}

                {footerData?.Images?.length > 0 && (
                  <div className="footer_logo">
                    {footerData.Images.map((item, idx) => (
                      <div className={`footer_logo_item`} key={idx}>
                        {item?.ImageLink ? (
                          <Link href={item.ImageLink}>
                            {item?.Image?.filename && (
                              <Image
                                loading="lazy"
                                width={getImageDimension(item.Image.filename).width}
                                height={getImageDimension(item.Image.filename).height}
                                className="image w-100"
                                src={item.Image.filename}
                                alt={item.Image.alt || 'image'}
                              />
                            )}
                          </Link>
                        ) : (
                          <span>
                            {item?.Image?.filename && (
                              <Image
                                loading="lazy"
                                width={getImageDimension(item.Image.filename).width}
                                height={getImageDimension(item.Image.filename).height}
                                className="image w-100"
                                src={item.Image.filename}
                                alt={item.Image.alt || 'image'}
                              />
                            )}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className={`copyright copyright-default ${footerData?.TextColor}`}>
          <div className="container">
            <div className="footer__bottom ptb--25 axil-basic-thine-line">
              <div>
                {footerData?.SocialIcons?.length > 0 && (
                  <div className="socail">
                    <div className="socail_icons">
                      {footerData.SocialIcons.map((item, idx) => (
                        <div className="socail_icon" key={idx}>
                          {item?.ImageLink ? (
                            <Link href={item.ImageLink}>
                              {item?.Image?.filename && (
                                <Image
                                  loading="lazy"
                                  width={24}
                                  height={24}
                                  src={item.Image.filename}
                                  alt={item.Image.alt || 'icon'}
                                />
                              )}
                            </Link>
                          ) : (
                            item?.Image?.filename && (
                              <Image
                                loading="lazy"
                                width={24}
                                height={24}
                                src={item.Image.filename}
                                alt={item.Image.alt || 'icon'}
                              />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {footerData?.CopyrightText && (
                  <div className={`inner text-center text-md-start link-hover ${isMobile ? 'ft-back' : ''}`}>
                    <div className="footer__copyright">
                      <p> © 2012 - {getCurrentYear()} </p>
                      <p>{footerData.CopyrightText}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="quick-contact">
                  <ul className={`link-hover d-flex justify-content-center justify-content-md-end liststyle color-var--2 ${isMobile ? 'ft-back' : ''}`}>
                    {footerData?.CopyrightLinks?.map((item, idx) => (
                      <li key={`menu-${idx}`}>
                        <Link href={item.Link} target={item.Target}>
                          {item.Label}
                        </Link>
                      </li>
                    ))}
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
