import { useState } from 'react';

const Notice = ({
  ShowNoticeSection = true,
  HideNavigationNotice = false,
  SectionBgColor = { color: 'rgb(5, 1, 72)' },
  SectionTextColor = { color: '#ffffff' },
  ShowBadge = true,
  BadgeText = 'Sanity CMS Contact Form Integration in 2025 – Read More',
  BadgeBgColor = { color: 'rgb(5, 1, 72)' },
  Content = '',
  ShowCloseButton = false
}) => {
  const [HideNotice, setNotice] = useState(true);
  const CloseNotice = () => {
    setNotice(false);
  };
  if (!ShowNoticeSection || HideNavigationNotice || !HideNotice) return null;
  return (
    <div>
      <div
        className="notice__container"
        style={SectionBgColor.color ? { backgroundColor: SectionBgColor.color } : {}}
      >
        <div className="container">
          <div
            className="notice__wrap"
            style={SectionTextColor.color ? { color: SectionTextColor.color } : {}}
          >
            {ShowBadge && (
              <div className="notice__item">
                {BadgeText && (
                  <span
                    className="notice"
                    style={BadgeBgColor.color ? { backgroundColor: BadgeBgColor.color } : {}}
                  >
                    {BadgeText}
                  </span>
                )}
              </div>
            )}
            {Content && (
              <div className="notice__content">
                <p>{Content}</p>
              </div>
            )}
          </div>
        </div>
        {ShowCloseButton && (
          <div className="notice__close-btn" onClick={CloseNotice}>
            {' '}
          </div>
        )}
      </div>
    </div>
  );
};
export default Notice;
