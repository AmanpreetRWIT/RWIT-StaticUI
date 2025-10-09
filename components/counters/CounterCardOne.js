import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterCardOne = ({ column, counterClass, data, TitleColor }) => {
  console.log('counterClass', counterClass)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className={column}>
      <div className={counterClass}>
        {data.Icon?.icon && (
          <div
            className="icon"
            style={data?.BgColor?.color ? { background: data?.BgColor.color } : {}}
          >
            <i
              className={`${data.Icon?.type} ${data.Icon?.icon}`}
              style={data.IconColor?.color ? { color: data.IconColor.color } : {}}
            ></i>
          </div>
        )}
        {data?.Number && (
          <h3
            className="count"
            ref={ref}
            style={TitleColor ? { color: TitleColor } : {}}
          >
            <CountUp start={0} end={inView ? data?.Number : 0} />
          </h3>
        )}
        {data?.Description && <p>{data.Description}</p>}
      </div>
    </div>
  );
};

export default CounterCardOne;
