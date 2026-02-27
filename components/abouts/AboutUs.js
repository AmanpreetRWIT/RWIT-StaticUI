import ContactForm from '../forms/ContactForm';

const AboutUs = ({ data, blok }) => {
  const aboutData = data || blok;
  return (
    <div
      className="axil-about-us-area ax-section-gap bg-color-white axil-shape-position"
      style={aboutData?.BGColor?.color ? { background: aboutData?.BGColor?.color } : {}}
    >
      <div className={`container`}>
        <div className="row">
          <div
            className={`${aboutData?.Form?.length > 0
              ? 'col-lg-6 col-xl-6 col-md-12 col-12'
              : 'col-12'
              }`}
          >
            <div className="axil-about-inner">
              <div className="section-title text-center">
                {aboutData?.Tags &&
                  aboutData?.Tags?.length > 0 &&
                  aboutData?.Tags.map((tag, index) => (
                    <span key={`${index}`} className="sub-title extra11-color" style={{ color: "#2690D4", border: "1px solid #2690D4", background: "#D4E9F6" }}>{tag}</span>
                  ))}

                {aboutData?.Title && <h2 className="title"
                  style={aboutData?.TitleColor?.color ? { color: aboutData?.TitleColor?.color } : {}}
                >
                  {aboutData?.Title}</h2>}
                {aboutData?.Description && (
                  <div className="subtitle-2 mb--50 mb_lg--20 mb_md--20 mb_sm--15 custom-color" style={{ color: aboutData?.DescriptionColor?.color ? aboutData?.DescriptionColor?.color : "#757589" }}>
                    {(aboutData?.Description)}
                  </div>
                )}
              </div>
            </div>
          </div>
          {aboutData?.Form?.length > 0 && (
            <div className="col-lg-6 col-xl-5 offset-xl-1 col-md-12 col-12 mt_md--30 mt_sm--30">
              {aboutData?.Form &&
                aboutData?.Form.map((Form, index) => (
                  <div className="contact-form-wrapper" key={`form-${index}`}>
                    <div className="axil-contact-form contact-form-style-1">
                      {Form?.FormTitle && (
                        <h3 className="title">{Form?.FormTitle}</h3>
                      )}

                      {Form && <ContactForm className="test"
                        formName={Form.FormName || Form.FormTitle}
                        formType={Form.FormType || "default-form"}
                        submitButton={Form.SubmitButton || "Submit"}
                        submitButtonClass={Form.SubmitButtonClass || ""}
                        inputs={(Form?.fields || []).map((input) => ({
                          name: input?.Name,
                          label: input?.Name,
                          type: input?.Type,
                          placeholder: input?.Placeholder,
                          required: input?.Required,
                          Select: input?.Select || [],
                          CssClass: input?.CssClass || "",
                        }))} />
                      }

                      {aboutData?.PhoneNumber && (
                        <div className="callto-action-wrapper text-center">
                          <span className="text">Or call us now</span>
                          <span>
                            <i className="fal fa-phone-alt"></i>{' '}
                            <a
                              href={`tel:${aboutData.PhoneNumber.replace(
                                /[- )(]/g,
                                ''
                              )}`}
                            >
                              {aboutData.PhoneNumber}
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {!aboutData?.DisableBgShape && (
        <div className="axil-shape-group">
          <div className="shape shape-1">
            <i className="icon icon-shape-12"></i>
          </div>
          <div className="shape shape-2">
            <i className="icon icon-shape-03"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
