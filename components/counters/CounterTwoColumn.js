import SectionTitle from '../common/SectionTitle';
import CounterCardOne from './CounterCardOne';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const CounterTwo = ({
  SecondLayout = false,
  BgColor = {},
  InvertColumns = false,
  Heading = '',
  Tags = '',
  Description = '',
  TitleColor = {},
  DescriptionColor = {},
  Buttons = null,
  CounterTextColor = {},
  CounterItem = []
}) => {
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
      {!SecondLayout ? (
        <div
          className="axil-counterup-area ax-section-gap bg-color-white"
          style={BgColor.color ? { background: BgColor.color } : {}}
        >
          <div className="container">
            <div
              className={`row align-items-center ${InvertColumns ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`${CounterItem.length > 0 ? 'col-lg-5 col-12' : 'col-12'} ${InvertColumns ? 'offset-xl-1' : ''}`}
              >
                <SectionTitle
                  title={Heading}
                  subtitle={Tags}
                  description={Description}
                  titleColor={TitleColor.color || ''}
                  descriptionColor={DescriptionColor.color || ''}
                  alignment="left"
                />
                {Buttons && (
                  <div className="view-all-portfolio-button mt--40">
                    <Link className="hoverable axil-button btn-solid" target="" href="/about">
                      <span className="button-text hoverable px-0">{Buttons.label}</span>
                    </Link>
                  </div>
                )}
              </div>

              {CounterItem.length > 0 && (
                <div
                  className={`counter__wrap col-lg-6 col-12 mt_md--40 mt_sm--40 ${InvertColumns ? 'offset-xl-0' : 'offset-xl-1'}`}
                >
                  <div className={`row`}>
                    {CounterItem.map((counter, index) => (
                      <CounterCardOne
                        key={`counter-${index}`}
                        column="col-lg-6 col-md-6 col-sm-6 col-6"
                        counterClass={`axil-counterup text-center ${counterClass(index)}`}
                        data={counter}
                        TitleColor={CounterTextColor.color || ''}
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
            style={BgColor.color ? { background: BgColor.color } : {}}
          >
            <div className="counterThree__content">
              <SectionTitle
                title={Heading}
                subtitle={Tags}
                description={Description}
                titleColor={TitleColor.color || ''}
                descriptionColor={DescriptionColor.color || ''}
                alignment="left"
              />
            </div>

            <div className="counterThree__wrapper">
              {CounterItem.map((counter, index) => (
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
