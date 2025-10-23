import React from 'react';
import contentData from '../../data/content/ContentBlock.json';

// Helper to render text with marks
const renderTextWithMarks = (textObj, index) => {
  let content = textObj.text;

  if (textObj.marks?.length) {
    textObj.marks.forEach((mark) => {
      switch (mark.type) {
        case 'bold':
          content = <strong key={index}>{content}</strong>;
          break;
        case 'underline':
          content = <u key={index}>{content}</u>;
          break;
        case 'textStyle':
          content = (
            <span
              key={index}
              style={{ color: mark.attrs?.color || 'inherit' }}
            >
              {content}
            </span>
          );
          break;
        case 'link':
          content = (
            <a
              key={index}
              href={mark.attrs?.href || '#'}
              target={mark.attrs?.target || '_self'}
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
          break;
        default:
          break;
      }
    });
  }

  return content;
};

// Recursive renderer
const renderContent = (contentArray) => {
  return contentArray.map((item, index) => {
    switch (item.type) {
      case 'paragraph':
        return (
          <p key={index}>
            {item.content
              ? item.content.map((textObj, i) => renderTextWithMarks(textObj, i))
              : item.text}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${item.attrs?.level || 2}`;
        return (
          <HeadingTag key={index}>
            {item.content?.map((textObj, i) => renderTextWithMarks(textObj, i))}
          </HeadingTag>
        );

      case 'list':
        if (item.style === 'unordered') {
          return (
            <ul key={index}>
              {item.items.map((li, liIndex) => (
                <li key={liIndex}>
                  {li.content
                    ? li.content.map((textObj, i) => renderTextWithMarks(textObj, i))
                    : li}
                </li>
              ))}
            </ul>
          );
        } else {
          return (
            <ol key={index}>
              {item.items.map((li, liIndex) => (
                <li key={liIndex}>
                  {li.content
                    ? li.content.map((textObj, i) => renderTextWithMarks(textObj, i))
                    : li}
                </li>
              ))}
            </ol>
          );
        }

      default:
        return null;
    }
  });
};

const ContentBlock = () => {
  const blok = contentData; // JSON data

  return (
    <div
      className="privacy-policy-area ax-section-gap"
      style={blok?.BgColor ? { background: blok?.BgColor } : {}}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div
              className={`content ${blok?.TitleColor ? 'custom-color' : ''}`}
              style={blok?.TitleColor ? { color: blok?.TitleColor } : {}}
            >
              <div className="inner">
                {blok?.content && (
                  <div className={`${blok?.TextAlign} content_list`}>
                    {renderContent(blok.content)}
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

export default ContentBlock;
