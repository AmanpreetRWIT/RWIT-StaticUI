import SectionTitle from '../common/SectionTitle';
import CounterCardOne from './CounterCardOne';

const CounterOne = ({
  SecondRow = false,
  BgColor,
  Heading,
  Tags,
  Description,
  DescriptionColor,
  TitleColor,
  HeadingColor,
  CounterTextColor,
  CounterItem = [],
  CounterItemTwo = [],
}) => {
  const counterClass = (i) => {
    if (i === 0) return 'counter-first';
    else if (i === 1) return 'counter-second';
    else if (i === 2) return 'mt--60 mt_md--30 mt_sm--30 counter-third';
    else if (i === 3) return 'counter-four';
  };

  return (
    <div
      id={SecondRow ? 'Counter' : ''}
      className="axil-counterup-area ax-section-gap bg-color-white"
      style={BgColor?.color ? { background: BgColor.color } : {}}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {!SecondRow && (
              <SectionTitle
                title={Heading}
                subtitle={Tags}
                description={Description}
                descriptionColor={DescriptionColor?.color || ''}
                titleColor={TitleColor?.color || ''}
                alignment="center"
              />
            )}
            {SecondRow && (
              <div className="content text-center">
                {Heading && (
                  <h2
                    className="axil-display-1 layer1 custom-h1"
                    style={HeadingColor?.color ? { color: HeadingColor.color } : {}}
                  >
                    {Heading}
                  </h2>
                )}

                {Description && (
                  <div
                    className="layer2 custom-color"
                    style={DescriptionColor?.color ? { color: DescriptionColor.color } : {}}
                  >
                    {(Description)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {CounterItem.length > 0 && (
          <div className="row">
            {CounterItem.map((counter, index) => (
              <CounterCardOne
                key={`counter-${index}`}
                column="col-lg-3 col-md-6 col-sm-6 col-6"
                id="Counter"
                counterClass={`axil-counterup mt--60 text-center ${counterClass(index)}`}
                data={counter}
                TitleColor={CounterTextColor?.color || ''}
              />
            ))}
          </div>
        )}

        {CounterItemTwo.length > 0 && (
          <div className="row">
            {CounterItemTwo.map((counter, index) => (
              <CounterCardOne
                key={`counter-${index}`}
                column="col-lg-3 col-md-6 col-sm-6 col-6"
                id="Counter"
                counterClass={`axil-counterup mt--60 text-center ${counterClass(index)}`}
                data={counter}
                TitleColor={CounterTextColor?.color || ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterOne;
