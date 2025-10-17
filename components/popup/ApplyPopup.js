import React, { useRef } from 'react';
import ContactForm from '../forms/ContactForm';

const ApplyPopup = ({
  blok,
  index,
  isActive,
  setIsActive,
  setIsPopupVisible,
  handleClose,
}) => {
  
  const popupRef = useRef(null);

  const Form = blok?.Form || [];
  return (
    <div ref={popupRef} id="ApplyPopup">
      <div
        id={`backlink-popup${index + 1}`}
        className={isActive=false ? 'modal-overlay' : 'modal-hide'}
      >
        <div className="newsletterModal">
          <div
            className="newsletterModal__cont container"
            style={
              blok?.ModalBgColor?.color
                ? { backgroundColor: blok.ModalBgColor.color }
                : { backgroundColor: '#EEF0FA' }
            }
          >
            <div className="newsletterModal__wrapper">
              {/* Close Icon */}
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

              {/* Popup Title */}
              {blok?.PopupTitle && (
                <div className="newsletterModal__title">
                  <h2
                    style={
                      blok?.PopupHeadingColor?.color
                        ? { color: blok.PopupHeadingColor.color }
                        : {}
                    }
                  >
                    {blok.PopupTitle}
                  </h2>
                </div>
              )}

              {/* Popup Description */}
              {blok?.PopupDescription && (
                <div className="newsletterModal__subtitle">
                  <p
                    style={
                      blok?.PopupDescriptionColor?.color
                        ? { color: blok.PopupDescriptionColor.color }
                        : {}
                    }
                  >
                    {blok.PopupDescription}
                  </p>
                </div>
              )}

              {/* Contact Form */}
              {Form?.length > 0 && (
                <ContactForm
                  className="test"
                  inputs={Form[0].fields}
                  submitButton={Form[0].submitButton?.text || 'Submit'}
                  submitButtonClass="btn-primary"
                  setIsPopupVisible={setIsPopupVisible}
                  setIsActive={setIsActive}
                  caseStudyPopup="CaseStudyPopup"
                  formName={Form[0].formTitle || 'Contact-form'}
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

export default ApplyPopup;
