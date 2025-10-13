import ContactForm from '../forms/ContactForm';

const AboutUs = ({ data }) => {
  return (
    <div
      className="axil-about-us-area ax-section-gap bg-color-white axil-shape-position "
      style={data?.BGColor?.color ? { background: data?.BGColor?.color } : {}}
    >
      <div className={`container`}>
        <div className="row">
          <div
            className={`${
              data?.Form.length > 0
                ? 'col-lg-6 col-xl-6 col-md-12 col-12'
                : 'col-12'
            }`}
          >
            <div className="axil-about-inner">
              <div className="section-title text-center">
                {data?.Tags &&
                  data?.Tags?.length > 0 &&
                  data?.Tags.map((tag, index) => (
                    <span key={`${index}`} className="sub-title extra11-color" style={{color:"#2690D4",border:"1px solid #2690D4",background:"#D4E9F6"}}>{tag}</span>
                  ))}

                {data?.Title && <h2 className="title"
                  style={data?.TitleColor?.color ? { color: data?.TitleColor?.color } : {}}
                >
                  {data?.Title}</h2>}
                {data?.Description && (
                  <div className="subtitle-2 mb--50 mb_lg--20 mb_md--20 mb_sm--15 custom-color" style={{ color: data?.DescriptionColor?.color ? data?.DescriptionColor?.color : "#757589" }}>
                    {(data?.Description)}
                  </div>
                )}
              </div>
            </div>
          </div>
          {data?.Form.length > 0 && (
            <div className="col-lg-6 col-xl-5 offset-xl-1 col-md-12 col-12 mt_md--30 mt_sm--30">
              {data?.Form &&
                data?.Form.map((Form, index) => (
                  <div className="contact-form-wrapper" key={`form-${index}`}>
                    <div className="axil-contact-form contact-form-style-1">
                      {Form?.FormTitle && (
                        <h3 className="title">{Form?.FormTitle}</h3>
                      )}

                      {Form && <ContactForm className="test"
                        formName={Form.formTitle}
                        formType={Form.formType || "default-form"}
                        submitButton={Form.submitButton || "Submit"}
                        submitButtonClass={Form.submitButtonClass || ""}
                        inputs={Form?.fields} />
                        }

                      {Form?.PhoneNumber && (
                        <div className="callto-action-wrapper text-center">
                          <span className="text">Or call us now</span>
                          <span>
                            <i className="fal fa-phone-alt"></i>{' '}
                            <a
                              href={`tel:${Form?.PhoneNumber?.replace(
                                /[- )(]/g,
                                ''
                              )}`}
                            >
                              {Form?.PhoneNumber}
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
      {!data?.DisableBgShape && (
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
