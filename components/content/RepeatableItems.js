import { render } from 'storyblok-rich-text-react-renderer';
export const RepeatableItems = ({ blok }) => {
  const getColumn = (column) => {
    if (column == 'col-1') return 'col-12 col-md-6 col-lg-1';
    else if (column == 'col-2') return 'col-12 col-md-6 col-lg-2';
    else if (column == 'col-3') return 'col-12 col-md-6 col-lg-3';
    else if (column == 'col-4') return 'col-12 col-md-6 col-lg-4';
    else if (column == 'col-5') return 'col-12 col-md-6 col-lg-5';
    else if (column == 'col-6') return 'col-12 col-md-6 col-lg-6';
    else if (column == 'col-7') return 'col-12 col-md-6 col-lg-7';
    else if (column == 'col-8') return 'col-12 col-md-6 col-lg-8';
    else if (column == 'col-9') return 'col-12 col-md-6 col-lg-9';
    else if (column == 'col-10') return 'col-12 col-md-6 col-lg-10';
    else if (column == 'col-11') return 'col-12 col-md-6 col-lg-11';
    else if (column == 'col-12') return 'col-12 col-md-6 col-lg-12';
    else return 'col-12 col-md-6 col-lg-6';
  };

  const getTextAlign = (TextAlign) => {
    if (TextAlign == 'text-start') return 'text-start';
    else if (TextAlign == 'text-center') return 'text-start text-lg-center';
    else if (TextAlign == 'text-end') return 'text-end';
    else return '';
  };

  return (
    <div
      className="ax-section-gap"
      style={blok?.BgColor?.color ? { background: blok?.BgColor?.color } : {}}
    >
      <div className="container">
        <div className="row flex-wrap">
          {blok?.RowBlock &&
            blok?.RowBlock?.map((content, index) => (
              <div
                className={`${getColumn(content?.ColumnWidth)} ${getTextAlign(
                  content?.TextAlign
                )}`}
                key={`list${index}`}
              >
                {content?.BlockContents &&
                  content?.BlockContents.map((data, index) => (
                    <div
                      className="content mb--60 mb_sm--30"
                      key={`child-list${index}`}
                    >
                      {data?.Title && (
                        <h6 className="content__title">{data?.Title}</h6>
                      )}
                      {data?.Description && (
                        <div className="content___desc">
                          {render(data?.Description)}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default RepeatableItems;
