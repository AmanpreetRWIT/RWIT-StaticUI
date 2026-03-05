import React, { useEffect, useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import Image from 'next/image';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { placeholderLight } from '../../helpers/utilities';

const OurPartners = ({
  Title,
  Tags,
  Description,
  TitleColor,
  DescriptionColor,
  BgColor,
  BenefitsTitle,
  PartnershipCards
}) => {
  const [isShown, setIsShown] = useState(false);
  const [isDesktop, setIsDesktop] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 20,
    },
    slideChanged() {
      setIsShown(false);
      setSelectedIndex(null);
    },
  });

  const handleDropdownToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  useEffect(() => {
    const checkWindowWidth = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 768);
    };
    checkWindowWidth();
    window.addEventListener('resize', checkWindowWidth);
    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    };
  }, []);

  useEffect(() => {
    setIsShown(false);
  }, [isDesktop]);

  return (
    <div className="ax-section-gap--lg partners-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title={Title}
              subtitle={Tags}
              alignment={isDesktop ? 'left' : 'center'}
              description={Description}
              titleColor={TitleColor}
              descriptionColor={DescriptionColor}
            />
          </div>
        </div>
        <div
          className="partners row"
          style={{
            backgroundColor: BgColor ? BgColor : '#f3f3f3',
          }}
        >
          {isDesktop ? (
            <>
              <div className="partners__cards d-md-grid">
                {PartnershipCards?.map((val, i) => (
                  <div key={i} className="partners__card">
                    {val?.Image && (
                      <div className="partners__image">
                        <Image
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={placeholderLight}
                          width={170}
                          height={50}
                          src={val.Image.filename}
                          alt={'partners image'}
                        />
                      </div>
                    )}
                    {val?.Description && (
                      <div className="partners__desc">
                        <p className="subtitle-2 darker-color">
                          {val.Description}
                        </p>
                      </div>
                    )}
                    {val?.LinkText && (
                      <Link href={val.Link || '/'} legacyBehavior>
                        <a target="_blank">
                          <div className="partners__title" style={{ color: '#000248' }}>
                            <span>{val.LinkText}</span>
                            <span className="fas fa-external-link-alt fa-xs partners__title__icon"></span>
                          </div>
                        </a>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="benefits d-none d-md-block">
                {BenefitsTitle && (
                  <div
                    className="benefits__dropdown"
                    onClick={() => setIsShown(!isShown)}
                  >
                    <span>{BenefitsTitle}</span>
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: isShown ? 'rotate(180deg)' : '',
                        transition: 'transform 0.5s ease-in-out',
                      }}
                    >
                      <path
                        fill=""
                        d="M10.1667 1.83333L6.00004 6L1.83337 1.83333"
                        stroke="#000248"
                      />
                    </svg>
                  </div>
                )}
                <div className={`benefits__lists ${isShown ? 'shown' : ''}`}>
                  {PartnershipCards?.map((val, i) => (
                    <>
                      {val?.benefits?.length > 0 && (
                        <div key={i} className="benefits__wrap">
                          <ul className="benefits__list">
                            {val?.Name && (
                              <h5 className="benefits__title mb-0">{val.Name}</h5>
                            )}
                            {val?.benefits?.map((item, idx) => (
                              <li key={idx} className="benefits__items">
                                {item.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div ref={sliderRef} className="partners__cards keen-slider">
              {PartnershipCards?.map((val, i) => (
                <div key={i} className="partners__card keen-slider__slide">
                  {val?.Image && (
                    <div className="partners__image">
                      <Image
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={placeholderLight}
                        width={170}
                        height={50}
                        src={val.Image}
                        alt="partners image"
                      />
                    </div>
                  )}
                  {val?.Description && (
                    <div className="partners__desc">
                      <p className="subtitle-2 darker-color">{val.Description}</p>
                    </div>
                  )}
                  {val?.LinkText && (
                    <Link href={val.Link || '/'} legacyBehavior>
                      <a target="_blank">
                        <div className="partners__title" style={{ color: '#000248' }}>
                          <span>{val.LinkText}</span>
                          <span className="fas fa-external-link-alt fa-xs partners__title__icon"></span>
                        </div>
                      </a>
                    </Link>
                  )}
                  {val?.benefits?.length > 0 && (
                    <div className="benefits d-block d-md-none" style={{ color: '#000248' }}>
                      {BenefitsTitle && (
                        <div
                          className="benefits__dropdown"
                          onClick={() => handleDropdownToggle(i)}
                        >
                          <span>{BenefitsTitle}</span>
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              transform:
                                selectedIndex === i ? 'rotate(180deg)' : '',
                              transition: 'transform 0.5s ease-in-out',
                            }}
                          >
                            <path
                              fill=""
                              d="M10.1667 1.83333L6.00004 6L1.83337 1.83333"
                              stroke="#000248"
                            />
                          </svg>
                        </div>
                      )}
                      <div
                        className={`benefits__lists d-grid ${
                          selectedIndex === i ? 'shown' : ''
                        }`}
                      >
                        <div className="benefits__wrap col-12">
                          <ul className="benefits__list">
                            {val?.Name && (
                              <h5 className="benefits__title mb-0">{val.Name}</h5>
                            )}
                            {val?.benefits?.map((item, idx) => (
                              <li key={idx} className="benefits__items">
                                {item.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
