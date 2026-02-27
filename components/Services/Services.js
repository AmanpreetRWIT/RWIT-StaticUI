import { useEffect, useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import ServiceCard from './ServiceCard';
import { useRouter } from 'next/router';
import { useMobile } from '../../helpers/utilities';

const Services = ({ blok }) => {
  const isMobile = useMobile(575);
  const [activeService, setActiveService] = useState(1);
  const [visible, setVisible] = useState(true);
  const changeActive = (index) => {
    setActiveService(index);
  };

  useEffect(() => {
    setActiveService(isMobile ? null : 1)
  }, [isMobile]);

  const router = useRouter();
  useEffect(() => {
    if (router?.pathname == '/') {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [router?.pathname]);

  return (
    <>
      <div
        id={blok?.RemoveAnimations ? 'ServiceCards' : 'Services'}
        className={`axil-service-area ax-section-gap bg-color-white  ${visible ? '' : 'axil-service-visible'
          }`}
        style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <SectionTitle
                title={blok?.Heading}
                subtitle={blok?.Tags}
                description={blok?.Description}
                titleColor={
                  blok?.TitleColor?.color ? blok?.TitleColor?.color : ''
                }
                alignment={blok?.TextAlign ? blok.TextAlign : 'center'}
                titleClass={'p-inline'}
                descriptionColor={
                  blok?.DescriptionColor?.color
                    ? blok?.DescriptionColor?.color
                    : ''
                }
              />
            </div>
          </div>
          {blok?.ServiceCard && (
            <div className={`row justify-content-center`}>
              {blok?.ServiceCard &&
                blok?.ServiceCard?.map((service, index) => (
                  <ServiceCard
                    key={`service-${index}`}
                    column="col-lg-4 col-md-6 col-sm-6 col-12"
                    index={index}
                    activeIndex={activeService}
                    data={service}
                    changeActive={changeActive}
                    TextColor={blok?.ServiceCardTextColor?.color || ''}
                    RemoveAnimations={blok?.RemoveAnimations}
                    RemoveBorders={blok?.RemoveBorders}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
