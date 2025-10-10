import React from 'react';

export const Table = ({ data }) => {
    return (
        <div className="privacy-policy-area ax-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className={`content ${data?.TitleColor ? 'custom-color' : ''}`}>
                            <div className="inner">
                                {data?.Table && (
                                    <div className={`content_list`}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    {data?.Table?.thead?.map((th, index) => (
                                                        <th key={index}>{th}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.Table?.tbody?.map((row, index) => (
                                                    <tr key={index}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
