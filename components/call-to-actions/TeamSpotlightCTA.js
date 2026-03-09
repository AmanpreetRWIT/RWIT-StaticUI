"use client";
import Image from "next/image";
import Button from '../buttons/Button';

function TeamSpotlightCTA({ blok }) {

  const heading=blok?.Heading

  const bgStyle = {};
  if (blok?.BgColor?.color) bgStyle.background = blok.BgColor.color;
  else if (typeof blok?.BgColor === "string" && blok?.BgColor)
    bgStyle.background = blok.BgColor;

  return (
    <section className="teamSpotlight">
      <div className="teamSpotlight__container" style={bgStyle}>
        <div className="teamSpotlight__content">
        <div className='teamSpotlight__quote' dangerouslySetInnerHTML={{ __html:heading }} />
          <div className="teamSpotlight__buttons">
          {blok?.Button?.length > 0 &&
                  blok.Button.map((button, index) => {
                    const link = button?.Link || {};
                    const hrefCandidate =
                      link?.story?.url ?? link?.cached_url ?? link?.url ?? '';
                    if (!hrefCandidate) return null;
                    return (
                      <Button
                        key={button?._uid || `button-${index}`}
                        button={button}
                        index={index}
                      />
                    );
                  })}
          </div>
        </div>
        {blok?.TeamImage?.filename && (
          <Image
            src={blok?.TeamImage?.filename}
            alt={blok?.TeamImage?.alt || "Team Member"}
            height={450}
            width={646}
          />
        )}
      </div>
    </section>
  );
}

export default TeamSpotlightCTA;
