import ContactForm from '../forms/ContactForm';

const Contact = ({
  BGColor,
  paddingTop,
  paddingBottom,
  TitleColor,
  DisableBgShape = false,
  contactForms = [],
  ContactCardData = [],
}) => {
  return (
    <section className="main-wrapper">
      <div
        className="axil-contact-area axil-shape-position ax-section-gap bg-color-white"
        style={{
          background: BGColor?.color ? `${BGColor.color}` : {},
          paddingTop: paddingTop ? `${paddingTop}px` : {},
          paddingBottom: paddingBottom ? `${paddingBottom}px` : {},
        }}
      >
        <div className="container">
          <div className="row">
            {contactForms.length > 0 && (
              <div
                className={`${
                  ContactCardData.length > 0
                    ? 'col-lg-6 col-md-12 col-xl-5 col-12'
                    : 'col-12'
                }`}
              >
                {contactForms.map((Form, index) => (
                  <div className="contact-form-wrapper" key={`form${index}`}>
                    <div className="axil-contact-form contact-form-style-1">
                      {Form?.formTitle && (
                        <h3
                          className="title"
                          style={
                            TitleColor?.color
                              ? { color: TitleColor.color }
                              : {}
                          }
                        >
                          {Form?.formTitle}
                        </h3>
                      )}
                      {Form && <ContactForm className="test"
                        formName={Form.FormTitle}
                        formType={Form.FormType || "default-form"}
                        submitButton={Form.submitButton || "Submit"}
                        submitButtonClass={Form.submitButtonClass || ""}
                        inputs={Form.fields} />}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {ContactCardData.length > 0 && (
              <div
                className={`${
                  contactForms.length > 0
                    ? 'col-lg-6 col-md-12 col-xl-6 offset-xl-1 col-12 mt_md--40 mt_sm--40'
                    : 'col-12 mt_md--40 mt_sm--40 d-flex gap-4 justify-content-center flex-wrap'
                }`}
              >
                {ContactCardData.map((data, index) => (
                  <div key={index} className="axil-address-wrapper mb-5">
                    <div className="axil-address">
                      <div className="inner">
                        {data?.Icon?.icon && (
                          <div className="icon">
                            <i
                              className={`${data.Icon?.type} ${data.Icon?.icon}`}
                            ></i>
                          </div>
                        )}
                        <div className="content">
                          {data?.Heading && (
                            <h4 className="title">{data?.Heading}</h4>
                          )}

                          {data?.Description && <p>{data?.Description}</p>}

                          {data?.Links && (
                            <p>
                              {data.Links.map((Button, i) => (
                                <a
                                  key={i}
                                  href={Button?.url}
                                  target={Button?.target || '_self'}
                                  className="axil-link"
                                  rel="noreferrer"
                                >
                                  {Button?.label}
                                </a>
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {!DisableBgShape && (
          <div className="shape-group">
            <div className="shape shape-01">
              <i className="icon icon-contact-01" />
            </div>
            <div className="shape shape-02">
              <i className="icon icon-contact-02" />
            </div>
            <div className="shape shape-03">
              <i className="icon icon-contact-03" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
