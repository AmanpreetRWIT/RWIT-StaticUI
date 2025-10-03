import ContactForm from "../forms/ContactForm";
import { useEffect, useState } from "react";
import { useMobile } from "../../helpers/utilities";
import { usePathname } from "next/navigation";


const HeroWithForm = ({
  title,
  heading,
  description,
  bgColor,
  buttons,
  gradientStyle,
  removeExtraPadding,
  contactForms,
}) => {
  
  const [toggleForm, setToggleForm] = useState(true);
  const isMobile = useMobile();
  const path = usePathname();

  useEffect(() => {
    const footer = document.querySelector(".axil-footer");
    if (footer) {
      !isMobile && (footer.style.zIndex = "-10");
      setTimeout(() => {
        !isMobile && (footer.style.zIndex = "1");
      }, 600);
      if (isMobile) {
        footer.style.paddingBottom = "126px";
      } else {
        footer.style.paddingBottom = "";
      }
    }
    setToggleForm(isMobile ? toggleForm : false);
  }, [isMobile]);

  useEffect(() => {
    const pageWrapper = document.querySelectorAll(".page-wrapper")[0];
    if (!isMobile && pageWrapper) pageWrapper.style.position = "";
    if (pageWrapper) {
      pageWrapper.style.position = toggleForm ? "static" : "static";
      if (!toggleForm) {
        const timer = setTimeout(() => {
          pageWrapper.style.position = "";
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, [toggleForm]);

  return (
    <div className="axil-slider-area axil-slide-activation">
      <div
        className={`axil-slide slide-style-4 ${
          gradientStyle || "theme-gradient-3"
        } slider-fixed-height d-flex align-items-center pt--80 pb--80 pt_sm--40 pt_md--40`}
        style={bgColor ? { background: bgColor } : {}}
      >
        <div
          className={`container callback-container position-relative ${
            removeExtraPadding ? "" : "pt--80 pb--80 pt_sm--40 pt_md--40"
          }`}
        >
          <div className="row align-items-center">
            <div className="col-lg-7 col-xl-8 col-12 order-2 order-lg-1 mt_md--40 mt_sm--30">
              <div className="content">
                {title && <span className="title">{title}</span>}
                {heading && (
                  <h1 className="axil-display-1 layer1">{heading}</h1>
                )}
                {description && (
                  <div className="layer2 custom-color"><p>{description}</p></div>
                )}
                {buttons && (
                  <div className="slider-button gap-4 d-flex">
                      <>
                      <a className="hoverable axil-button meeting_btn   
                      btn-solid 
                        " target="_blank" href="https://calendly.com/jimmynarula/introductory-meeting"><span className="button-text hoverable ">Book a discovery call</span><span className="fas fa-external-link-alt"></span></a></>
                  </div>
                )}

                <div className="callback">
                  <div className="callback-wrap">
                    <div className="callback-button">
                      
                      <button
                        className="hoverable axil-button btn-medium btn-transparent w-100"
                        onClick={() => setToggleForm(!toggleForm)}
                      >
                        Request callback
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {
              <div
                className={`col-lg-5 col-xl-4 order-2 order-lg-2 mt_md--50 mt_sm--40 callback-form ${
                  toggleForm ? "callback-toggle" : ""
                }`}
              >
                {contactForms.map((form, index) => (
                  <div className="contact-form-wrapper" key={index}>
                    <div className="axil-contact-form hero-from-wrapper-container">
                      {form.formTitle && (
                        <div className="title-wrap">
                          <h2 className="title">{form.formTitle}</h2>
                          <button
                            className="close-menu"
                            onClick={() => setToggleForm(false)}
                          ></button>
                        </div>
                      )}
                      <ContactForm
                        className="test"
                        formName={form.formTitle}
                        formType={form.formType || "default-form"}
                        submitButton={form.submitButton || "Submit"}
                        submitButtonClass={form.submitButtonClass || ""}
                        inputs={form.fields}
                      />
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithForm;
