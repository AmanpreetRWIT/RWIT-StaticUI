import Link from 'next/link';
import SectionTitle from '../common/SectionTitle';
import { useEffect, useState } from 'react';

const CallToActionSlim = ({
  backgroundImage = '',
  mobileBgImage = '',
  containerBgColor = '',
  minHeight = 0,
  applyBorder = false,
  borderColor = '#efefef',
  bgColor = '',
  heading = 'Stay Connected With Us',
  tags = 'Subscribe today',
  titleColor = '',
  description = 'This is a description text for the CTA slim section.',
  descriptionColor = '',
  buttons = [],
  phones = [],
  showPhone,
  showTags= false,
}) => {
  const [newImage, setImage] = useState(backgroundImage);
  const largeMobile = 575;

  useEffect(() => {
    const handleResize = () => {
      const newImg =
        window.innerWidth > largeMobile ? backgroundImage : mobileBgImage;
      setImage(newImg);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [backgroundImage, mobileBgImage]);

  return (
    <div
      id="CallToActionSlim"
      className="axil-call-to-action-slim"
      style={containerBgColor ? { backgroundColor: containerBgColor } : {}}
    >
      <div
        className={`axil-call-to-action-slim-area shape-position align-items-center ${
          backgroundImage ? 'bg-image' : ''
        }`}
        style={{
          minHeight: minHeight ? `${minHeight}px` : '',
          border: applyBorder ? '1px solid' : 'none',
          borderColor: borderColor,
          backgroundImage: backgroundImage ? `url(${newImage})` : '',
          backgroundColor: bgColor,
        }}
      >
        <div className="axil-call-to-action-slim-area-wrapper shape-position ax-section-gap d-flex align-items-center">
          <div className="axil-call-to-action-slim-area-row">
            <div className="col-lg-12">
              <div className="axil-call-to-action position-relative axil-call-to-action-slim-container">
                <SectionTitle
                  titleClass={description ? 'mb-4' : ''}
                  title={heading}
                  subtitle={tags}
                  alignment="center"
                  titleColor={titleColor}
                  showTags={showTags}
                />

                {description && (
                  <p
                    style={descriptionColor ? { color: descriptionColor } : {}}
                    className="text-description"
                  >
                    {description}
                  </p>
                )}

                <div className="text-center">
                <a class="hoverable axil-button meeting_btn   
        btn-solid 
          " target="_blank" href="https://calendly.com/jimmynarula/introductory-meeting"><span class="button-text hoverable ">{buttons.label}</span><span class="fas fa-external-link-alt"></span></a>
            

                  {showPhone && phones.map((phone, index) => (
                    <div className="callto-action" key={'phone' + index}>
                      <span className="text">Or call us now</span>
                      <span>
                        <i className="fal fa-phone-alt" />{' '}
                        <Link href={phone.url} target={phone.target} legacyBehavior>
                          <a>{phone.label}</a>
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSlim;