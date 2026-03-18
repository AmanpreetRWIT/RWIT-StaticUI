import React from 'react';

const BlogTable = ({ blok }) => {
  const {
    Table,
    TableStyle,
    Alignment = 'left',
    HeadingBgColor,
    HeadingColor,
    isBlogPage
  } = blok || {};
  const TableLayout = (layout) => {
    switch (layout) {
      case 'table1':
        return '';
      case 'table2':
        return 'blogTable2';
      default:
        return '';
    }
  };

  const getColStyle = (colCount) => {
    if (colCount === 2) return { width: '50%' };
    if (colCount > 2) return { width: `${100 / colCount}%` };
    return {};
  };

  const colCount = Table?.thead?.length || 0;

  if (!Table?.thead || Table.thead.length === 0) return null;

  return (
    <div
      id={TableLayout(TableStyle)}
      className={`blog-table inner ${!isBlogPage ? 'container' : ''}`}
    >
      <div className="content_list content_block">
        <table className={`blog_table align-${Alignment}`}>
          <thead>
            <tr>
              {Table.thead.map((data, index) => (
                <th
                  key={index}
                  style={{
                    backgroundColor: HeadingBgColor,
                    color: HeadingColor,
                    ...(!isBlogPage ? getColStyle(colCount) : {})
                  }}
                >
                  {data.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Table.tbody.map((row, index) => (
              <tr key={index}>
                {row.body.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={!isBlogPage ? getColStyle(colCount) : {}}
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
