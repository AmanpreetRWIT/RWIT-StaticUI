import React, { useRef } from "react";
import ContactForm from "../forms/ContactForm";
import careerData from "../../public/carrerData.json";
import { usePathname } from "next/navigation";

const ApplyPopup = ({
  blok,
  index,
  isActive=false,
  setIsActive,
  setIsPopupVisible,
  handleClose,
}) => {
  const popupRef = useRef(null);
  const formFields = blok?.Form?.length > 0 ? blok?.Form[0] : [];
  const path = usePathname();
  const fields = {
    ...formFields,
    Inputs: formFields?.Inputs?.map((input) =>
      input?.Name === "Position"
        ? {
            ...input,
            Select: careerData?.data?.map((career) => {
              return {
                Value: career?.content?.CareerHeading,
                Default:
                  (path === "/" + career?.full_slug &&
                    career?.content?.CareerHeading) ||
                  "",
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
        className={(isActive ? "modal-overlay" : "modal-hide")}
      >
        <div id="" className="newsletterModal">
          <div
            className="newsletterModal__cont container"
            style={
              blok?.ModalBgColor?.color
                ? { backgroundColor: blok?.ModalBgColor?.color }
                : { backgroundColor: "#EEF0FA" }
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
              {blok?.PopupTitle && (
                <div className="newsletterModal__title">
                  <h2
                    style={
                      blok?.PopupHeadingColor?.color
                        ? { color: blok?.PopupHeadingColor?.color }
                        : {}
                    }
                  >
                    {blok?.PopupTitle}
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
                  formName="Apply-Form"
                  formType="apply-form"
                  inputs={(fields?.Inputs || []).map((input) => ({
                    name: input?.Name,
                    label: input?.Name,
                    type: input?.Type,
                    placeholder: input?.Placeholder,
                    required: input?.Required,
                    Select: input?.Select || [],
                    CssClass: input?.CssClass || "",
                  }))}
                  submitButton="Apply Now"
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
//blok?.Form?.length
