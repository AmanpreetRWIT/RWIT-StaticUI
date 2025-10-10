import React, { useRef } from 'react';
import ContactForm from '../forms/ContactForm';
const BacklinkPopup = ({
  blok,
  index,
  isActive,
  setIsActive,
  isPopupVisible,
  setIsPopupVisible,
  handleClose,
  activeModalIndex,
}) => {
  const popupRef = useRef(null);
  const form = popupRef?.current?.querySelector('form');
  form?.classList.add('newsletter__form');
  const formInputs = form?.querySelectorAll('input');
  formInputs?.forEach((input) => {
    input.placeholder = input?.nextSibling?.textContent;
    input.style.padding = '10px';
  });
  return (
    <div ref={popupRef} id="CtaWithPopup">
      <div
        id={`backlink-popup${index + 1}`}
        className={
          isActive && activeModalIndex ? 'modal-overlay' : 'modal-hide'
        }
      >
        <div id="cta-popup" className="newsletterModal">
          <div
            className="newsletterModal__cont container"
            style={
              blok?.ModalBgColor?.color
                ? { backgroundColor: blok?.ModalBgColor?.color }
                : { backgroundColor: '#EEF0FA' }
            }
          >
            <div className="newsletterModal__wrapper">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClose}
              >
                <path
                  d="M13 13L39 39M13 39L39 13"
                  stroke="#000248"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {blok?.PopupHeading && (
                <div className="newsletterModal__title">
                  <h2
                    style={
                      blok?.PopupHeadingColor?.color
                        ? { color: blok?.PopupHeadingColor?.color }
                        : {}
                    }
                  >
                    {blok?.PopupHeading}
                  </h2>
                </div>
              )}
              {blok?.PopupDescription && (
                <div className="newsletterModal__subtitle">
                  <p
                    style={
                      blok?.PopupDescriptionColor?.color
                        ? { color: blok?.PopupDescriptionColor?.color }
                        : {}
                    }
                  >
                    {blok?.PopupDescription}
                  </p>
                </div>
              )}
              {blok?.Form?.length > 0 && (
                <ContactForm
                  formData={blok?.Form[0]}
                  setIsPopupVisible={setIsPopupVisible}
                  setIsActive={setIsActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BacklinkPopup;
