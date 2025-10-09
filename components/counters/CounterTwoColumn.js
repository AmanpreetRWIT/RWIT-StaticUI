import SectionTitle from '../common/SectionTitle';
import CounterCardOne from './CounterCardOne';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterTwo = ({ blok }) => {
  console.log('blok', blok)
  const counterClass = (i) => {
    if (i === 0) return 'counter-1';
    else if (i === 1) return 'color-style-two mt--60 mt_mobile--40';
    else if (i === 2) return 'color-style-three mt_mobile--40';
    else if (i === 3) return 'color-style-four mt--60 mt_mobile--40';
  };

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <>
      {!blok?.SecondLayout ? (
        <div
          className="axil-counterup-area ax-section-gap bg-color-white"
          style={blok?.BgColor?.color ? { background: blok?.BgColor.color } : {}}
        >
          <div className="container">
            <div
              className={`row align-items-center ${
                blok?.InvertColumns ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`${
                  blok?.CounterItem?.length > 0 ? 'col-lg-5 col-12' : 'col-12'
                } ${blok?.InvertColumns ? 'offset-xl-1' : ''}`}
              >
                <SectionTitle
                  title={blok?.Heading}
                  subtitle={blok?.Tags}
                  description={blok?.Description}
                  titleColor={blok?.TitleColor?.color || ''}
                  descriptionColor={blok?.DescriptionColor?.color || ''}
                  alignment="left"
                />
                {blok?.Buttons && (
                  // <div className="view-all-portfolio-button mt--40">
                  //   {blok?.Buttons.map((button, index) => (
                  //     <button key={index} onClick={button?.onClick}>
                  //       {button?.label}
                  //     </button>
                  //   ))}
                  // </div>
                  <div class="view-all-portfolio-button mt--40"><a class="hoverable axil-button   
        btn-solid 
          " target="" href="/about"><span class="button-text hoverable px-0">{blok?.Buttons.label}</span></a></div>
                )}
              </div>

              {blok?.CounterItem?.length > 0 && (
                <div
                  className={`counter__wrap col-lg-6 col-12 mt_md--40 mt_sm--40 ${
                    blok?.InvertColumns ? 'offset-xl-0' : 'offset-xl-1'
                  }`}
                >
                  <div className={`row`}>
                    {blok?.CounterItem.map((counter, index) => (
                      <CounterCardOne
                        key={`counter-${index}`}
                        column="col-lg-6 col-md-6 col-sm-6 col-6"
                        counterClass={`axil-counterup text-center ${counterClass(index)}`}
                        data={counter}
                        TitleColor={blok?.CounterTextColor?.color || ''}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="counterThree">
          <div
            className="counterThree__container container"
            style={blok?.BgColor?.color ? { background: blok?.BgColor.color } : {}}
          >
            <div className="counterThree__content">
              <SectionTitle
                title={blok?.Heading}
                subtitle={blok?.Tags}
                description={blok?.Description}
                titleColor={blok?.TitleColor?.color || ''}
                descriptionColor={blok?.DescriptionColor?.color || ''}
                alignment="left"
              />
            </div>

            <div className="counterThree__wrapper">
              {blok?.CounterItem.map((counter, index) => (
                <div className="counterThree__card" key={index}>
                  {counter?.Number && (
                    <h3 className="count" ref={ref}>
                      <CountUp start={0} end={inView ? counter?.Number : 0} />+
                    </h3>
                  )}
                  {counter?.Description && <p>{counter.Description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CounterTwo;
