import React, { useEffect, useState, useRef } from "react";
import ContactForm from "../forms/ContactForm";
import { useMobile } from "../../helpers/utilities";

const CaseStudyPopup = ({ data }) => {
  const layoutSettings = data?.layoutSettings;
  const CaseStudyModal = layoutSettings?.CaseStudyModal?.[0];

  const PopupHeadingColor = CaseStudyModal?.PopupHeadingColor;
  const PopupDescriptionColor = CaseStudyModal?.PopupDescriptionColor;
  const ModalBgColor = CaseStudyModal?.ModalBgColor;
  const Form = CaseStudyModal?.Form;
  const title = data?.title;
  const description = data?.description;

  const isMobile = useMobile();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      const form = popupRef.current.querySelector("form");
      if (form) {
        form.classList.add("newsletter__form");
        const formInputs = form.querySelectorAll("input");
        formInputs.forEach((input) => {
          input.placeholder =
            input?.nextSibling?.textContent || input.placeholder;
          input.style.padding = "10px";
        });
      }
    }
  }, [isPopupVisible, isActive]);

  
  useEffect(() => {
    const checkAndResetPopupState = () => {
      const storedState = localStorage.getItem("popupState2");
      const storedDate = localStorage.getItem("popupActivationDate2");
      const currentDate = new Date();
      const activationDate = storedDate ? new Date(storedDate) : null;
      const daysDifference = activationDate
        ? Math.floor((currentDate - activationDate) / (1000 * 60 * 60 * 24))
        : 0;

      if (daysDifference >= 30) {
        localStorage.setItem("popupState2", "false");
        localStorage.removeItem("popupActivationDate2");
      } else if (storedState === null && !isActive) {
        setTimeout(() => setIsPopupVisible(true), 30000);
        localStorage.setItem("popupState2", "true");
        localStorage.setItem("popupActivationDate2", currentDate.toISOString());
      } else if (storedState === "false") {
        setIsPopupVisible(false);
      } else {
        setTimeout(() => setIsPopupVisible(true), 30000);
      }
    };

    checkAndResetPopupState();
    return () => clearTimeout();
  }, [isActive, isPopupVisible]);

  const handleClose = () => {
    setIsActive(false);
    setIsPopupVisible(false);
    localStorage.setItem("popupState2", "false");
  };

  // Scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.body.scrollHeight * 0.5;

      if (scrollPosition >= threshold) {
        const storedState = localStorage.getItem("popupState2");
        if (storedState === "true") {
          setIsActive(true);
          localStorage.setItem("popupState2", "true");
          window.removeEventListener("scroll", handleScroll);
        } else {
          localStorage.setItem("popupState2", "false");
          setIsActive(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!isMobile && (
        <div
          ref={popupRef}
          className={
            isActive || isPopupVisible ? "modal-overlay" : "modal-hide"
          }
        >
          <div id="cta-popup" className="newsletterModal">
            <div
              className="newsletterModal__cont container"
              style={
                ModalBgColor?.color
                  ? { backgroundColor: ModalBgColor.color }
                  : { backgroundColor: "#eef0fa" }
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

                {title && (
                  <div className="newsletterModal__title">
                    <h2
                      style={
                        PopupHeadingColor?.color
                          ? { color: PopupHeadingColor.color }
                          : {}
                      }
                    >
                      {title}
                    </h2>
                  </div>
                )}

                {description && (
                  <div className="newsletterModal__subtitle">
                    <p
                      style={
                        PopupDescriptionColor?.color
                          ? { color: PopupDescriptionColor.color }
                          : {}
                      }
                    >
                      {description}
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
      )}
    </>
  );
};

export default CaseStudyPopup;
