import Link from 'next/link';
import { useState } from 'react';

const Notice = ({ noticeData }) => {
  const [_HideNotice, setNotice] = useState(true);
  const CloseNotice = () => {
    setNotice(false);
  };

  return (
    <>
      <div>
        {noticeData?.ShowNoticeSection && (
          <div
            className="notice__container"
            style={
              noticeData?.SectionBgColor
                ? { backgroundColor: noticeData?.SectionBgColor }
                : {}
            }
          >
            <div className="container">
              <div
                className="notice__wrap"
                style={
                  noticeData?.SectionTextColor
                    ? { color: noticeData?.SectionTextColor }
                    : {}
                }
              >
                {noticeData?.ShowBadge && (
                  <div className="notice__item">
                    {noticeData?.BadgeText && (
                      <span
                        className="notice"
                        style={
                          noticeData?.BadgeBgColor
                            ? {
                                backgroundColor: noticeData?.BadgeBgColor,
                              }
                            : {}
                        }
                      >
                        {noticeData?.BadgeText}
                      </span>
                    )}
                  </div>
                )}
                {noticeData?.Content && (
                  <div className="notice__content">
                    <p>
                      {noticeData?.Content?.map((item, index) => {
                        if (item.type === 'text') {
                          return item.text;
                        }

                        if (item.type === 'link') {
                          return (
                            <Link
                              key={index}
                              href={item.attrs.href}
                              target={item.attrs.target}
                              rel="noopener noreferrer"
                            >
                              {item.text}
                            </Link>
                          );
                        }

                        return null;
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {noticeData?.ShowCloseButton && (
              <div className="notice__close-btn" onClick={CloseNotice}>
                {' '}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Notice;
