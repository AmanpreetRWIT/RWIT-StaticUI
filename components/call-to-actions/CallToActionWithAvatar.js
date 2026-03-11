import SectionTitle from "../common/SectionTitle";
import Image from "next/legacy/image";
import { placeholder } from "../../helpers/utilities";
import Button from "@/components/buttons/Button";

const CallToActionWithAvatar = ({
  isSlim = false,
  isBlogPage = false,
  bgColor = "",
  avatar = "https://a-us.storyblok.com/f/1016184/397x462/0f47330420/jim-sir.png",
  heading = "Your CTA Heading",
  tags = "Subtitle text",
  description = "This is a short description for the call to action section.",
  headingColor = "",
  descriptionColor = "",
  Button: ctaButtons = [],
  HideArrow = false,
  HideButtonLogo = false,
  showTags,
}) => {


  return (
    <div
      id={`${isBlogPage ? "CtaWithAvatar2" : "CtaWithAvatar"}`}
      className="cta-with-avatar"
      style={bgColor && !isSlim ? { backgroundColor: bgColor } : {}}
    >
      <div
        className={`cta-with-avatar-container container ${
          isSlim ? "cta-with-avatar-container2" : ""
        }`}
        style={bgColor ? { backgroundColor: bgColor } : {}}
      >
        <div
          className={`cta-with-avatar-wrapper ${
            isSlim ? "cta-with-avatar-wrapper2" : ""
          }`}
          style={!avatar ? { justifyContent: "center" } : {}}
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
              showTags={showTags}
            />
            <div className="cta-with-avatar-btn slider-button gap-4 d-flex">
            {ctaButtons?.length > 0 &&
                  ctaButtons.map((button, index) => {
                    const link = button?.Link || {};
                    const hrefCandidate =
                      link?.story?.url ?? link?.cached_url ?? link?.url ?? '';
                    if (!hrefCandidate) return null;

                    return (
                      <Button
                        key={button?._uid || `button-${index}`}
                        blok={button}
                        Index={index}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionWithAvatar;
