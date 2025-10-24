import React from "react";
import repeatableItemsData from "../../data/content/RepeatableItems.json";

export const RepeatableItems = () => {
  const blok = repeatableItemsData;

  const getColumn = (column) => {
    const base = "col-12 col-md-6";
    if (!column) return `${base} col-lg-6`;
    return `${base} col-lg-${column.split("-")[1]}`;
  };

  const getTextAlign = (TextAlign) => {
    if (TextAlign === "text-center") return "text-start text-lg-center";
    return TextAlign || "";
  };

  return (
    <div
      className="ax-section-gap"
      style={blok?.BgColor?.color ? { background: blok?.BgColor?.color } : {}}
    >
      <div className="container">
        <div className="row flex-wrap">
          {blok?.RowBlock?.map((content, index) => (
            <div
              key={`row-${index}`}
              className={`${getColumn(content?.ColumnWidth)} ${getTextAlign(content?.TextAlign)}`}
            >
              {content?.BlockContents?.map((data, childIndex) => (
                <div className="content mb--60 mb_sm--30" key={`child-${childIndex}`}>
                  {data?.Title && <h6 className="content__title">{data.Title}</h6>}
                  {data?.Description && (
                    <div
                      className="content___desc"
                      dangerouslySetInnerHTML={{ __html: data.Description }}
                    />
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
