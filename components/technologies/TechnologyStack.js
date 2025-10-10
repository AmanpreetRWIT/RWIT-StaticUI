import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '../common/SectionTitle';

const TechnologyStack = ({ data }) => {
  const Clients = data?.clients;

  return (
    <div
      className="ax-section-gap--lg bg-color-white client-and-partner"
      style={data?.bgColor ? { background: data.bgColor } : {}}
    >
      <div className={`client container ${data?.hideBorder ? 'border-none' : ''}`}>
        <div className="row">
          <div className="col-lg-12" id="SectionTitle">
            <SectionTitle
              title={data?.title}
              subtitle={data?.tags}
              alignment="center"
              titleColor={data?.titleColor || ''}
            />
            {data?.description && (
              <div
                className="text-center px-3 custom-color"
                style={data?.descriptionColor ? { color: data.descriptionColor } : {}}
              >
                {data.description}
              </div>
            )}
          </div>
        </div>
        <div id="clientPartnerCards">
          <>
            {Clients &&
              Clients.map((client, index) => (
                <div className="clientPartnerCards" key={`client-${index}`}>
                  {client?.link ? (
                    <Link href={client.link} legacyBehavior>
                      <a className="clientPartnerCards--link" target={client?.target}>
                        {client?.image && (
                          <div className="clientPartnerCards__img">
                            <Image
                              loading="lazy"
                              width={80}
                              height={80}
                              src={client?.grayscale ? `${client.image}?grayscale=true` : client.image}
                              alt={client?.alt || client?.name || 'client-logo'}
                            />
                          </div>
                        )}
                        {client?.name && (
                          <div className={`clientPartnerCards__title ${client?.linkTextClass || ''}`}>
                            <h3>{client.name}</h3>
                          </div>
                        )}
                      </a>
                    </Link>
                  ) : (
                    <div className="clientPartnerCards--link">
                      {client?.image && (
                        <div className="clientPartnerCards__img">
                          <Image
                            loading="lazy"
                            width={80}
                            height={80}
                            src={client?.grayscale ? `${client.image}?grayscale=true` : client.image}
                            alt={client?.alt || client?.name || 'client-logo'}
                          />
                        </div>
                      )}
                      {client?.name && (
                        <div className="clientPartnerCards__title">
                          <h3>{client.name}</h3>
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
