import React from 'react';

export const Table = ({ data }) => {
    return (
        <div
            className="privacy-policy-area ax-section-gap"  >
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div
                            className={`content ${data?.TitleColor?.color ? 'custom-color' : ''
                                }`}
                        >
                            <div className="inner">
                                {data?.Table &&
                                    <div className={`content_list`}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    {data?.Table?.thead?.map((data, index) => (
                                                        <th key={index}>{data.value}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.Table?.tbody?.map((data, index) => (
                                                    <tr key={index}>
                                                        {data?.body && data?.body?.map((innerData, innerIndex) => (
                                                            <td key={innerIndex}>{innerData?.value}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
