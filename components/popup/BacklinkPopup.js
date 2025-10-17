import React, { useRef, useEffect } from 'react';
import ContactForm from '../forms/ContactForm';

const BacklinkPopup = ({
  blok,
  index,
  isActive,
  setIsActive,
  isPopupVisible=true,
  setIsPopupVisible,
  handleClose,
  activeModalIndex,
}) => {
  const popupRef = useRef(null);
  const Form = blok?.Form;
  // Ensure form styling updates only after render
  useEffect(() => {
    const form = popupRef.current?.querySelector('form');
    if (form) {
      form.classList.add('newsletter__form');
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input) => {
        const labelText = input?.nextSibling?.textContent;
        if (labelText && !input.placeholder) {
          input.placeholder = labelText;
        }
        input.style.padding = '10px';
      });
    }
  }, [isActive, isPopupVisible]);

  return (
    <div ref={popupRef} id="CtaWithPopup">
      <div
        id={`backlink-popup${index + 1}`}
        className={isActive && activeModalIndex ? 'modal-overlay' : 'modal-hide'}
      >
        <div id="cta-popup" className="newsletterModal">
          <div
            className="newsletterModal__cont container"
            style={{
              backgroundColor: blok?.ModalBgColor?.color || '#EEF0FA',
            }}
          >
            <div className="newsletterModal__wrapper">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}
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
                    style={{
                      color: blok?.PopupHeadingColor?.color || '#000248',
                    }}
                  >
                    {blok.PopupHeading}
                  </h2>
                </div>
              )}

              {blok?.PopupDescription && (
                <div className="newsletterModal__subtitle">
                  <p
                    style={{
                      color: blok?.PopupDescriptionColor?.color || '#333',
                    }}
                  >
                    {blok.PopupDescription}
                  </p>
                </div>
              )}
                {Form?.length > 0 && (
                  <ContactForm
                    className="test"
                    inputs={Form[0].fields} 
                    submitButton={Form[0].submitButton?.text || "Submit"}
                    submitButtonClass="btn-primary" 
                    setIsPopupVisible={setIsPopupVisible}
                    setIsActive={setIsActive}
                    caseStudyPopup="CaseStudyPopup"
                    formName={Form[0].formTitle || "Contact-form"}
                    formType="default-form"
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
