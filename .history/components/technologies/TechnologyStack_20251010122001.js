import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '../common/SectionTitle';


const TechnologyStack = ({ blok }) => {
  const Clients = blok?.ClientAndPartnerInfoWithName;
  return (
    <div
      className="ax-section-gap--lg bg-color-white client-and-partner"
      style={blok?.BgColor?.color ? { background: blok?.BgColor?.color } : {}}
    >
      <div
        className={`client container ${blok?.HideBorder ? 'border-none' : ''}`}
      >
        <div className="row">
          <div className="col-lg-12" id="SectionTitle">
            <SectionTitle
              title={blok?.Title}
              subtitle={blok?.Tags}
              alignment="center"
              titleColor={blok?.TitleColor?.color || ''}
            />

            {blok?.Description && (
              <div
                className="text-center px-3 custom-color"
                style={
                  blok?.DescriptionColor?.color
                    ? { color: blok?.DescriptionColor?.color }
                    : {}
                }
              >
                {(blok?.Description)}
              </div>
            )}
          </div>
        </div>
        <div id="clientPartnerCards">
          <>
            {Clients &&
              Clients.map((client, index) => (
                <div className="clientPartnerCards" key={`client-${index}`}>
                  {client?.Link?.story?.url || client?.Link?.cached_url  || client?.Link?.url ? (
                    <Link
                      href={client?.Link?.story?.url || client?.Link?.cached_url  || client?.Link?.url}
                      legacyBehavior
                    >
                      <a
                        className="clientPartnerCards--link"
                         target={client?.Link?.target}
                      >
                        {client?.Image?.filename && (
                          <div className="clientPartnerCards__img">
                            <Image
                              loading="lazy"
                              width={80}
                              height={80}
                              src={
                                client?.Grayscale
                                  ? `${client?.Image?.filename}/m/filters:grayscale()`
                                  : client?.Image?.filename
                              }
                              alt={
                                client?.Image?.alt ||
                                client?.Image?.title ||
                                client?.LinkText ||
                                'client-logo'
                              }
                            />
                          </div>
                        )}

                        {client?.Name && (
                          <div
                            className={`clientPartnerCards__title ${client?.LinkTextClass}`}
                          >
                            {client?.Name && <h3>{client?.Name}</h3>}
                          </div>
                        )}
                      </a>
                    </Link>
                  ) : (
                    <div className="clientPartnerCards--link">
                      {client?.Image?.filename && (
                        <div className="clientPartnerCards__img">
                          <Image
                            loading="lazy"
                            width={80}
                            height={80}
                            src={
                              client?.Grayscale
                                ? `${client?.Image?.filename}/m/filters:grayscale()`
                                : client?.Image?.filename
                            }
                            alt={
                              client?.Image?.alt ||
                              client?.Image?.title ||
                              client?.LinkText ||
                              'client-logo'
                            }
                          />
                        </div>
                      )}

                      {client?.Name && (
                        <div className="clientPartnerCards__title">
                          {client?.Name && <h3>{client?.Name}</h3>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default TechnologyStack;
