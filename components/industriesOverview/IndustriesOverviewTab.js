'use client';
import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import Image from 'next/image';
import Button from '../buttons/Button';

const IndustriesOverviewTab = ({ blok }) => {
  const [activeTab, setActiveTab] = useState(0);

  const activeTabData = blok?.IndustriesOverviewCards?.[activeTab];
  

  return (
    <section className='industriesTab'>
      <div className='industriesTab__container container'>
        <SectionTitle
          title={blok?.Title}
          subtitle={blok?.Tags}
          description={blok?.Description}
          alignment='center'
        />

        {/* Tabs Navigation */}
        {blok?.IndustriesOverviewCards?.length > 0 && (
          <div className='industriesTab__tabs'>
            {blok?.IndustriesOverviewCards?.map((tab, index) => (
              <button
                key={tab._uid}
                className={`industriesTab__tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.Title}
              </button>
            ))}
          </div>
        )}

        {/* Active Tab Content */}
        {activeTabData && (
          <div className='industriesTab__content' key={activeTab}>
            <div className='industriesTab__content__left'>
              {activeTabData.Heading && (
                <h3 className='industriesTab__content__heading'>{activeTabData.Heading}</h3>
              )}

              {activeTabData.Description && (
                <div className='industriesTab__content__description'>
                  {(activeTabData.Description)}
                </div>
              )}

              {/* Features */}
              {activeTabData?.Cards?.length > 0 && (
                <div className='industriesTab__features'>
                  {activeTabData?.Cards?.map((feature, index) => (
                    <div key={index} className='industriesTab__feature'>
                      <Image
                        src='/images/CheckCircle.svg'
                        alt='arrow'
                        width={20}
                        height={20}
                        className='industries__item__arrow'
                      />
                      <span>{feature?.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              {activeTabData?.Button?.length > 0 &&
                activeTabData.Button.map((button, index) => {
                  const link = button?.Link || {};
                  const hrefCandidate =
                    link?.story?.url ?? link?.cached_url ?? link?.url ?? '';
                  if (!hrefCandidate) return null;

                  return (
                    
                    <Button
                      key={button?._uid || `button-${index}`}
                      button={button}
                      index={index}
                    ><i className="fas fa-external-link-alt"/></Button>
                  );
                })}
            </div>

            {/* Right Image */}
            {activeTabData?.Image?.filename && (
              <div className='industriesTab__content__right'>
                <Image
                  src={activeTabData?.Image?.filename}
                  alt={activeTabData?.Image?.alt || activeTabData?.Title}
                  width={500}
                  height={400}
                  className='industriesTab__image'
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default IndustriesOverviewTab;
