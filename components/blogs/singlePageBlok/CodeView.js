import React from 'react';

const CodeView = ({ Code = '', TextColor = '#000', ThemeColor = '#f5f5f5' }) => {
  return (
    <div className="code-clipboard">
      <pre
        className="code"
        style={{
          color: TextColor,
          backgroundColor: ThemeColor,
          padding: '15px',
          borderRadius: '5px',
          overflowX: 'auto'
        }}
      >
        <code style={{ color: TextColor, fontFamily: 'monospace' }}>
          {Code}
        </code>
      </pre>
    </div>
  );
};

export default CodeView;
