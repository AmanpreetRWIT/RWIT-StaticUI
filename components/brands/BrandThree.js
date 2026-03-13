import Image from 'next/image';
import SectionTitle from '../common/SectionTitle';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { getImageDimension, useMobile } from '../../helpers/utilities';
import { useEffect, useState } from 'react';
import { getAutoSliderOptions } from '../../helpers/slider';

const BrandsThree = ({ blok }) => {
  console.log('BrandsThree', blok)
  const isMobile = useMobile();
  const [loaded, setLoaded] = useState(false);
  const [sliderRef] = useKeenSlider(
    getAutoSliderOptions(setLoaded, {
      initial: 0,
      mode: 'free',
      slides: {
        perView: 2.3,
      },
    })
  );

  useEffect(() => {
    setLoaded(true);
  }, [isMobile]);

  return (
    <div
      className='axil-brand-area ax-section-gap bg-color-white'
      style={blok?.BGColor ? { background: blok?.BGColor } : {}}
    >
      <div id='brand__container' className='container'>
        <div
          className={`brand__wrap row align-items-center justify-content-between ${
            blok?.RevertColumn ? 'flex-row-reverse' : ''
          }`}
        >
          <div
            className={`${
              blok?.logos.length > 0 || blok?.Clients.length > 0
                ? 'col-xl-5 col-lg-5 col-md-12 col-12'
                : 'col-12'
            }`}
          >
            <SectionTitle
              title={blok?.Title}
              subtitle={blok?.Tags}
              description={blok?.Description}
              titleColor={blok?.TitleColor ? blok?.TitleColor : ''}
              descriptionColor={blok?.DescriptionColor ? blok?.DescriptionColor : ''}
              alignment='left'
            />
          </div>
          {(blok?.logos.length > 0 || blok?.Clients.length > 0) && (
            <div className='brand__grid col-xl-7 col-lg-7 mt_md--40 mt_sm--40'>
              <>
                {!(isMobile && loaded) ? (
                  <div className='axil-brand-logo-wrapper'>
                    {blok?.Logos && blok?.Logos.length > 0 ? (
                      <ul className='brand-list liststyle'>
                        {blok?.Logos &&
                          blok?.Logos?.map((brand, index) => (
                            <li key={`brand-${index}`}>
                              {brand?.src && (
                                <span>
                                  <Image
                                    loading='lazy'
                                    width={getImageDimension(brand?.src, 120, 100).width}
                                    height={
                                      getImageDimension(brand?.src, 120, 100).height
                                    }
                                    src={
                                      brand.Grayscale
                                        ? `${brand?.src}/m/filters:grayscale()`
                                        : brand?.src
                                    }
                                    alt={brand?.alt ? brand?.alt : 'brand-logo'}
                                  />
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <ul className='brand-list liststyle'>
                        {blok?.Clients &&
                          blok?.Clients.length > 0 &&
                          blok?.Clients?.map((brand, index) => (
                            <li key={`brand-${index}`}>
                              {brand?.src && (
                                <span>
                                  <Image
                                    loading='lazy'
                                    width={
                                      getImageDimension(brand?.src, 120, 100)
                                        .width
                                    }
                                    height={
                                      getImageDimension(brand?.src, 120, 100)
                                        .height
                                    }
                                    src={brand?.src}
                                    alt={
                                      brand?.alt
                                        ? brand?.alt
                                        : 'brand-logo'
                                    }
                                  />
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className='axil-brand-logo-wrapper'>
                    {blok?.Logos && blok?.Logos.length > 0 ? (
                      <ul ref={sliderRef} className='brand-list keen-slider'>
                        {blok?.Logos &&
                          blok?.Logos?.map((brand, index) => (
                            <li key={`brand-${index}`} className='keen-slider__slide'>
                              {brand?.src && (
                                <span>
                                  <Image
                                    loading='lazy'
                                    width={getImageDimension(brand?.src, 120, 100).width}
                                    height={
                                      getImageDimension(brand?.src, 120, 100).height
                                    }
                                    src={
                                      brand.Grayscale
                                        ? `${brand?.src}/m/filters:grayscale()`
                                        : brand?.src
                                    }
                                    alt={brand?.alt ? brand?.alt : 'brand-logo'}
                                  />
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <ul ref={sliderRef} className='brand-list keen-slider'>
                         {blok?.Clients &&
                          blok?.Clients.length > 0 &&
                          blok?.Clients?.map((brand, index) => (
                            <li key={`brand-${index}`} className='keen-slider__slide'>
                              {brand?.content?.Logo?.filename && (
                                <span>
                                  <Image
                                    loading='lazy'
                                    width={
                                      getImageDimension(brand?.content?.Logo?.filename, 120, 100)
                                        .width
                                    }
                                    height={
                                      getImageDimension(brand?.content?.Logo?.filename, 120, 100)
                                        .height
                                    }
                                    src={brand?.content?.Logo?.filename}
                                    alt={
                                      brand.content.Logo?.alt
                                        ? brand.content.Logo?.alt
                                        : 'brand-logo'
                                    }
                                  />
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                )}
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandsThree;
