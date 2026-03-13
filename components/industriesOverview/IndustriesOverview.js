import SectionTitle from '../common/SectionTitle';
import Image from 'next/image';
import Link from 'next/link';


const IndustriesOverview = ({ blok }) => {
  return (
    <section className='industries'>
      <div className='industries__container container'>
        <SectionTitle
          title={blok?.Title}
          subtitle={blok?.Tags}
          description={blok?.Description}
          alignment='center'
          titleColor={blok?.TitleColor?.color ? blok?.TitleColor?.color : ''}
          descriptionColor={blok?.DescriptionColor?.color ? blok?.DescriptionColor?.color : ''}
        />
        {blok?.IndustriesCards?.length > 0 && (
          <div className='industries__grid'>
            {blok?.IndustriesCards?.map((item) => {
              const Wrapper = item?.Link?.cached_url ? Link : 'div';
              const wrapperProps = item?.Link?.cached_url
                ? { href: item.Link.cached_url }
                : {};

              return (
                <Wrapper
                  {...wrapperProps}
                  key={item?._uid || item?.id}
                  className='industries__item'
                >
                  <div className='industries__item__header'>
                    {(item?.Logo?.filename || item?.Heading) && (
                      <>
                        {item?.Logo?.filename && (
                          <Image
                            className='industries__item__icon'
                            src={item?.Logo?.filename}
                            alt={item?.Heading || ''}
                            width={36}
                            height={36}
                          />
                        )}
                        {item?.Heading && (
                          <h3 className='industries__item__title'>{item?.Heading}</h3>
                        )}
                      </>
                    )}
                    {item?.Link?.cached_url && (
                      <div className='industries__item__arrow'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='40'
                          height='40'
                          viewBox='0 0 40 40'
                          fill='none'
                        >
                          <rect
                            x='1'
                            y='1'
                            width='38'
                            height='38'
                            rx='19'
                            stroke='#000248'
                            strokeWidth='2'
                          />
                          <path
                            d='M29.0459 20.7959L22.2959 27.5459C22.0846 27.7572 21.7979 27.8759 21.4991 27.8759C21.2002 27.8759 20.9135 27.7572 20.7022 27.5459C20.4908 27.3345 20.3721 27.0479 20.3721 26.749C20.3721 26.4501 20.4908 26.1635 20.7022 25.9521L25.5312 21.1249H11.75C11.4516 21.1249 11.1655 21.0064 10.9545 20.7954C10.7435 20.5844 10.625 20.2983 10.625 19.9999C10.625 19.7016 10.7435 19.4154 10.9545 19.2044C11.1655 18.9934 11.4516 18.8749 11.75 18.8749H25.5312L20.7041 14.0449C20.4927 13.8336 20.374 13.5469 20.374 13.248C20.374 12.9492 20.4927 12.6625 20.7041 12.4512C20.9154 12.2398 21.2021 12.1211 21.5009 12.1211C21.7998 12.1211 22.0865 12.2398 22.2978 12.4512L29.0478 19.2012C29.1527 19.3058 29.2359 19.4302 29.2926 19.5671C29.3493 19.704 29.3784 19.8507 29.3782 19.9989C29.3781 20.1471 29.3486 20.2938 29.2916 20.4305C29.2346 20.5673 29.1511 20.6914 29.0459 20.7959Z'
                            fill='#000248'
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {item?.Description && (
                    <div className='industries__item__description'>{(item?.Description)}</div>
                  )}
                </Wrapper>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default IndustriesOverview;
