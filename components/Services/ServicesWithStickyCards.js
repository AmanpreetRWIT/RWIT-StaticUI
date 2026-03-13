import Image from 'next/legacy/image';
import { getImageDimension } from '../../helpers/utilities';
import Link from 'next/link';
import Button from '../buttons/Button';

const ServicesWithStickyCards = ({ blok }) => {
  const CardTitleColor = blok?.CardTitleColor || '';
  const CardDescriptionColor = blok?.CardDescriptionColor || '#757589';

  return (
    <div
      className='ax-section-gap--lg sticky_service__container'
      style={blok?.BGColor ? { background: blok?.BGColor } : {}}
    >
      <div className={`container`}>
        <div
          className={`sticky_service ${blok?.showImageOnRight ? 'right' : ''} ${
            !blok?.Services.length > 0 ? 'column' : ''
          } ${
            blok?.Tags.length > 0 ||
            blok?.Title ||
            blok?.Image?.filename ||
            blok?.Description
              ? ''
              : 'full-width'
          }`}
        >
          {(blok?.Tags.length > 0 ||
            blok?.Title ||
            blok?.Image?.filename ||
            blok?.Description) && (
            <div className='sticky_service__left section-title'>
              <div className='sticky_service_c'>
                {blok?.Tags && Array.isArray(blok?.Tags)
                  ? blok?.Tags?.map((tag, index) => <span key={index} className="sub-title extra11-color" style={{color:"#2690D4",border:"1px solid #2690D4",background:"#D4E9F6"}} >{tag?.TagName}</span>)
                  : null}

                {blok?.Title && (
                  <h2
                    className={`title`}
                    style={{
                      color: blok?.TitleColor || '',
                    }}
                  >
                    {blok?.Title}
                  </h2>
                )}

                {blok?.Description && (
                  <div
                    className={`sticky_service__desc  ${
                      blok?.DescriptionColor ? 'custom-color' : ''
                    }`}
                    style={{
                      color: blok?.DescriptionColor
                        ? blok?.DescriptionColor
                        : '#757589',
                    }}
                  >
                    {blok?.Description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}

                    {blok?.Button && (
                      <div className='sticky_service__btn'>
                        <Button
                          blok={blok?.Button}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {blok?.Image?.filename && (
                <div className='sticky_service_img'>
                  <Image
                    loading='lazy'
                    width={getImageDimension(blok?.Image?.filename, 420, 270).width}
                    height={getImageDimension(blok?.Image?.filename, 420, 270).height}
                    src={blok?.Image?.filename}
                    alt={blok?.Image?.alt ? blok?.Image?.alt : ''}
                  />
                </div>
              )}
            </div>
          )}
          {blok?.Services.length > 0 && (
            <div className='sticky_service__content' style={{ color: CardTitleColor }}>
              {/* card section */}
              <div className='sticky_service__wrap'>
                {blok?.Services &&
                  blok?.Services.map((service, index) => (
                    <div key={`service${index}`}>
                      {service?.Link?.url ? (
                        <Link href={service?.Link?.url || ""} legacyBehavior>
                          <a>
                            <div className='sticky_service__items'>
                              {service?.Image?.filename && (
                                <div className='sticky_service__icon'>
                                  <Image
                                    loading='lazy'
                                    width={60}
                                    height={60}
                                    src={service?.Image?.filename}
                                    alt={
                                      service?.Image?.alt ? service?.Image?.alt : 'service image'
                                    }
                                  />
                                </div>
                              )}

                              <div className='sticky_service__items__wrap'>
                                <h3
                                  className='sticky_service__title'
                                  style={{ color: CardTitleColor }}
                                >
                                  {' '}
                                  {service?.Heading}
                                </h3>
                                {service?.Description && (
                                  <div
                                    className={`sticky_service__detail custom-color ${
                                      blok?.ShowMobileDesc ? 'show-mobile-desc' : ''
                                    }`}
                                    style={{ color: CardDescriptionColor }}
                                  >
                                    {service?.Description}
                                  </div>
                                )}
                                <p className='mt-2'> Learn More...</p>
                              </div>
                            </div>
                          </a>
                        </Link>
                      ) : (
                        <div className='sticky_service__items'>
                          {service?.Image?.filename && (
                            <div className='sticky_service__icon'>
                              <Image
                                loading='lazy'
                                width={60}
                                height={60}
                                src={service?.Image?.filename}
                                alt={service?.Image?.alt ? service?.Image?.alt : 'service image'}
                              />
                            </div>
                          )}

                          <div className='sticky_service__items__wrap'>
                            <h3 className='sticky_service__title' style={{ color: CardTitleColor }}>
                              {' '}
                              {service?.Heading}
                            </h3>
                            {service?.Description && (
                              <div
                                className={`sticky_service__detail custom-color ${
                                  blok?.ShowMobileDesc ? 'show-mobile-desc' : ''
                                }`}
                                style={{ color: CardDescriptionColor }}
                              >
                                {service?.Description}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ServicesWithStickyCards;
