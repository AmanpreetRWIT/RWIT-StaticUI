import SectionTitle from '../common/SectionTitle';
import Image from 'next/legacy/image';
import { placeholder } from '../../helpers/utilities';

const CallToActionWithAvatar = ({
  isSlim = false,
  isBlogPage = false,
  bgColor = '',
  avatar = ' ',
  heading = 'Your CTA Heading',
  tags = 'Subtitle text',
  description = 'This is a short description for the call to action section.',
  headingColor = '',
  descriptionColor = '',
  buttons = [],
}) => {
  return (
    <div
      id={`${isBlogPage ? 'CtaWithAvatar2' : 'CtaWithAvatar'}`}
      className="cta-with-avatar"
      style={bgColor && !isSlim ? { backgroundColor: bgColor } : {}}
    >
      <div
        className={`cta-with-avatar-container container ${
          isSlim ? 'cta-with-avatar-container2' : ''
        }`}
        style={bgColor ? { backgroundColor: bgColor } : {}}
      >
        <div
          className={`cta-with-avatar-wrapper ${
            isSlim ? 'cta-with-avatar-wrapper2' : ''
          }`}
          style={!avatar ? { justifyContent: 'center' } : {}}
        >
          {avatar && (
            <div className="cta-with-avatar-image">
              <Image
                placeholder="blur"
                blurDataURL={placeholder}
                src={avatar}
                width={264}
                height={316}
                alt="avatar"
              />
            </div>
          )}
          <div className="cta-with-avatar-content">
            <SectionTitle
              isBlogPage={isBlogPage}
              titleClass=""
              title={heading}
              subtitle={tags}
              alignment="center"
              description={description}
              titleColor={headingColor}
              descriptionColor={descriptionColor}
            />
            <div className="cta-with-avatar-btn slider-button gap-4 d-flex">
            <a class="hoverable axil-button meeting_btn   
        btn-solid 
          " target="_blank" href="https://calendly.com/jimmynarula/introductory-meeting"><span class="button-text hoverable ">{buttons.label}</span><span class="fas fa-external-link-alt"></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionWithAvatar;
