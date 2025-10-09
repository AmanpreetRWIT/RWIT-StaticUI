import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '../common/SectionTitle';
import { useMobile } from '../../helpers/utilities';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const ClientAndPartner = ({ data }) => {
  const [visible, setVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [clientData, setClientData] = useState([]);
  const isMobile = useMobile();
  const [loaded, setLoaded] = useState(false);
  const [sliderRef] = useKeenSlider({
    initial: 0,
    slides: { perView: 2 },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // initial check
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const partnerData = data?.ClientAndPartnerInfo.filter((Item) => {
      return Item?.Link?.url;
    });
    setClientData(partnerData);
  }, [data]);

  const clientCards = useMemo(() => {
    return (clientData || [].map((client, index) => (
      <div className="card__wrap" key={`client-${index}`}>
        {client?.Link?.url ? (
          <Link href={client?.Link?.url} legacyBehavior>
            <a className="client__card client__card--link" target={client?.Link?.target}>
              {client?.Image?.filename && (
                <div className="client__img">
                  <Image
                    loading="lazy"
                    width={145}
                    height={43}
                    src={client?.Grayscale ? `${client?.Image?.filename}/m/filters:grayscale()` : client?.Image?.filename}
                    alt={client?.Image?.alt || client?.Image?.title || client?.LinkText || 'client-logo'}
                  />
                </div>
              )}

              {client?.LinkText && (
                <div className={`client__title ${client?.LinkTextClass}`}>
                  <span> {client?.LinkText}</span>
                  <span className="fas fa-external-link-alt fa-xs client__title__icon"></span>
                </div>
              )}
            </a>
          </Link>
        ) : (
          <div className="client__card">
            {client?.Image?.filename && (
              <div className="client__img">
                <Image
                  loading="lazy"
                  width={145}
                  height={43}
                  src={client?.Grayscale ? `${client?.Image?.filename}/m/filters:grayscale()` : client?.Image?.filename}
                  alt={client?.Image?.alt || client?.Image?.title || client?.LinkText || 'client-logo'}
                />
              </div>
            )}

            {client?.LinkText && (
              <div className="client__title">
                <span> {client?.LinkText}</span>
              </div>
            )}
          </div>
        )}
      </div>
    )));
  }, [clientData]);

  return (
    <div
      className="ax-section-gap--lg bg-color-white client-and-partner"
      style={data?.BgColor?.color ? { background: data?.BgColor?.color } : {}}
    >
      <div className={`client container ${data?.HideBorder ? 'border-none' : ''}`}>
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={data?.Title}
              subtitle={data?.Tags}
              alignment="left"
              titleColor={data?.TitleColor?.color || ''}
            />

            {data?.Description && (
              <div
                className="section-title text-start custom-color"
                style={data?.DescriptionColor?.color ? { color: data?.DescriptionColor?.color } : {}}
              >
                {data?.Description}
              </div>
            )}
          </div>
        </div>

        {data?.ClientAndPartnerInfo && (
          <div
            className="client__cards"
            style={data?.InfoTextColor?.color ? { color: data?.InfoTextColor?.color } : {}}
          >
            {!isMobile ? (
              !visible && isSmallScreen ? (
                <>
                  {clientCards}
                </>
              ) : (
                <>
                  {data?.ClientAndPartnerInfo.map((client, index) => (
                    <div className="card__wrap" key={`client-${index}`}>
                      {client?.Link?.url ? (
                        <Link href={client?.Link?.url} legacyBehavior>
                          <a className="client__card client__card--link" target={client?.Link?.target}>
                            {client?.Image?.filename && (
                              <div className="client__img">
                                <Image
                                  loading="lazy"
                                  width={145}
                                  height={43}
                                  src={client?.Grayscale ? `${client?.Image?.filename}/m/filters:grayscale()` : client?.Image?.filename}
                                  alt={client?.Image?.alt || client?.Image?.title || client?.LinkText || 'client-logo'}
                                />
                              </div>
                            )}

                            {client?.LinkText && (
                              <div className={`client__title ${client?.LinkTextClass}`}>
                                <span> {client?.LinkText}</span>
                                <span className="fas fa-external-link-alt fa-xs client__title__icon"></span>
                              </div>
                            )}
                          </a>
                        </Link>
                      ) : (
                        <div className="client__card">
                          {client?.Image?.filename && (
                            <div className="client__img">
                              <Image
                                loading="lazy"
                                width={145}
                                height={43}
                                src={client?.Grayscale ? `${client?.Image?.filename}/m/filters:grayscale()` : client?.Image?.filename}
                                alt={client?.Image?.alt || client?.Image?.title || client?.LinkText || 'client-logo'}
                              />
                            </div>
                          )}

                          {client?.LinkText && (
                            <div className="client__title">
                              <span> {client?.LinkText}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )
            ) : (
              <div ref={sliderRef} className="keen-slider">
                {clientData?.map((client, index) => (
                  <div className="card__wrap keen-slider__slide" key={`client-${index}`}>
                    {client?.Link?.url ? (
                      <Link href={client?.Link?.url} legacyBehavior>
                        <a className="client__card client__card--link" target={client?.Link?.target}>
                          {client?.Image?.filename && (
                            <div className="client__img">
                              <Image
                                loading="lazy"
                                width={145}
                                height={43}
                                src={client?.Grayscale ? `${client?.Image?.filename}/m/filters:grayscale()` : client?.Image?.filename}
                                alt={client?.Image?.alt || client?.Image?.title || client?.LinkText || 'client-logo'}
                              />
                            </div>
                          )}

                          {client?.LinkText && (
                            <div className={`client__title ${client?.LinkTextClass}`}>
                              <span> {client?.LinkText}</span>
                              <span className="fas fa-external-link-alt fa-xs client__title__icon"></span>
                            </div>
                          )}
                        </a>
                      </Link>
                    ) : (
                      <div className="client__card">
                        {client?.Image?.filename && (
                          <div className="client__img">
                            <Image
                              loading="lazy"
                              width={145}
                              height={43}
                              src={client?.Grayscale ? `${client?.Image?.filename}/m/filters:grayscale()` : client?.Image?.filename}
                              alt={client?.Image?.alt || client?.Image?.title || client?.LinkText || 'client-logo'}
                            />
                          </div>
                        )}

                        {client?.LinkText && (
                          <div className="client__title">
                            <span> {client?.LinkText}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientAndPartner;
