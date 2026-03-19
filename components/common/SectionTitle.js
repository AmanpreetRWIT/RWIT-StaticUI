import { useEffect, useState } from 'react';

const SectionTitle = ({
  title,
  subtitle,
  description,
  color,
  alignment,
  titleClass,
  styleClass,
  titleColor,
  animation = true,
  descriptionColor,
  isBlogPage,
  showTags=true,
  showTitle=true,
}) => {
  const [textAlignment, setTextAlignment] = useState('text-center');
  useEffect(() => {
    if (alignment === 'center') setTextAlignment('text-center');
    else if (alignment === 'right') setTextAlignment('text-end');
    else setTextAlignment('text-start');
  }, [alignment, setTextAlignment]);
  return (
    <div 
      className={`section-title ${textAlignment} ${styleClass}`}
      style={color ? { color: color } : {}}
    >
      {showTags && subtitle && (
        <span className="sub-title extra11-color" style={{ color: '#2690D4', border: '1px solid #2690D4', background: '#D4E9F6' }}>
          {Array.isArray(subtitle)
            ? subtitle
                .map((tag) => (tag && typeof tag === 'object' && tag.TagName != null ? tag.TagName : tag))
                .filter((t) => t != null && typeof t !== 'object')
                .join(', ')
            : typeof subtitle === 'object' && subtitle !== null && 'TagName' in subtitle
              ? subtitle.TagName
              : subtitle}
        </span>
      )}

      {showTitle && title && (
        <>
          {isBlogPage ? (
            <h3
              className={`title ${titleClass ? titleClass : ''}`}
              style={titleColor ? { color: titleColor } : {}}
            >
              {title}
            </h3>
          ) : (
            <h2
              className={`title ${titleClass ? titleClass : ''}`}
              style={titleColor ? { color: titleColor } : {}}
            >
              {title}
            </h2>
          )}
        </>
      )}

      {description && (
        <p
          className="subtitle-2"
          style={descriptionColor ? { color: descriptionColor } : {}}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
