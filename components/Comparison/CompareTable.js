import RightIcon from '../Icons/RightIcon';
import WrongIcon from '../Icons/WrongIcon';
import SectionTitle from '../common/SectionTitle';
import Link from 'next/link';

function CompareTable({ data }) {
  const Tabledata = data?.CompareTable;

  const fieldCheck = (item) => {
    switch (item?.FieldType) {
      case 'BooleanText':
        return (
          <>
            <span>{item?.isTrue ? <RightIcon /> : <WrongIcon />}</span>{' '}
            <span>{item?.TextValue && item?.TextValue}</span>
          </>
        );
      case 'Text':
        return (
          <>
            <span>{item?.TextValue ? item?.TextValue : '-'}</span>
          </>
        );
      case 'Link':
        return (
          <>
            <span>
              {item?.Link ? (
                <Link href={item?.Link} legacyBehavior>
                  <a href={item?.Link} rel="noopener noreferrer">
                    {item?.TextValue}
                  </a>
                </Link>
              ) : (
                <span>{item?.TextValue && item?.TextValue}</span>
              )}
            </span>
          </>
        );
      case 'Boolean':
        return (
          <>
            <span>{item?.isTrue ? <RightIcon /> : <WrongIcon />}</span>{' '}
          </>
        );
      default:
        return (
          <>
            <span>-</span>{' '}
          </>
        );
    }
  };

  return (
    <>
      {Tabledata && Tabledata.length > 0 && (
        <div
          id="comparisonTable"
          className="compareTable"
          style={data?.BgColor ? { background: data?.BgColor } : {}}
        >
          <div className={`compareTable-container container`}>
            <div className="position-relative">
              <SectionTitle
                titleClass=""
                title={data?.Title || ''}
                subtitle={data?.Tags}
                alignment="center"
                description={data?.Description || ''}
                titleColor={data?.TitleColor || ''}
                descriptionColor={data?.DescriptionColor || ''}
              />
            </div>

            <div className="compareTable-wrapper">
              <div className={`content text-center`}>
                <table>
                  <thead>
                    <tr>
                      <th>FrameWork</th>
                      <th>{data?.CmsOne ? data?.CmsOne : '-'}</th>
                      <th>{data?.CmsTwo ? data?.CmsTwo : '-'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Tabledata.map((row, index) => (
                      <tr key={index}>
                        <td>{row?.Label}</td>
                        <td>{fieldCheck(row?.CmsOne[0])}</td>
                        <td>{fieldCheck(row?.CmsTwo[0])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompareTable;
