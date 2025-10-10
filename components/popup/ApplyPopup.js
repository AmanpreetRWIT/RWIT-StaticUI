import React, { useRef } from 'react';
import ContactForm from '../forms/ContactForm';
import careerData from '../../public/careerData.json';
import { usePathname } from 'next/navigation';

const ApplyPopup = ({
  PopupTitle,
  PopupDescription,
  PopupHeadingColor,
  PopupDescriptionColor,
  ModalBgColor,
  Form,
  index,
  isActive,
  setIsActive,
  setIsPopupVisible,
  handleClose,
}) => {
  const popupRef = useRef(null);
  const formFields = Form?.length > 0 ? Form[0] : [];
  const path = usePathname();

  const fields = {
    ...formFields,
    Inputs: formFields?.Inputs?.map((input) =>
      input?.Name === 'Position'
        ? {
            ...input,
            Select: careerData?.data?.map((career) => {
              return {
                Value: career?.content?.CareerHeading,
                Default:
                  (path === '/' + career?.full_slug &&
                    career?.content?.CareerHeading) ||
                  '',
              };
            }),
          }
        : input
    ),
  };

  return (
    <div ref={popupRef} id="ApplyPopup">
      <div
        id={`backlink-popup${index + 1}`}
        className={isActive ? 'modal-overlay' : 'modal-hide'}
      >
        <div id="" className="newsletterModal">
          <div
            className="newsletterModal__cont container"
            style={
              ModalBgColor?.color
                ? { backgroundColor: ModalBgColor.color }
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
              {PopupTitle && (
                <div className="newsletterModal__title">
                  <h2
                    style={
                      PopupHeadingColor?.color
                        ? { color: PopupHeadingColor.color }
                        : {}
                    }
                  >
                    {PopupTitle}
                  </h2>
                </div>
              )}
              {PopupDescription && (
                <div className="newsletterModal__subtitle">
                  <p
                    style={
                      PopupDescriptionColor?.color
                        ? { color: PopupDescriptionColor.color }
                        : {}
                    }
                  >
                    {PopupDescription}
                  </p>
                </div>
              )}
              {Form?.length > 0 && (
                <ContactForm
                  formData={fields}
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

export default ApplyPopup;
