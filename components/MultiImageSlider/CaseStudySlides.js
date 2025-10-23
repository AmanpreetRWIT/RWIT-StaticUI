import React from 'react';
import CaseStudySlide from './CaseStudySlide';

const CaseStudySlides = ({
  Tag,
  TagColor,
  Heading,
  HeadingColor,
  Description,
  DescriptionColor,
  SliderSpeed,
  slides = []
}) => {
  return (
    <div id="CaseStudySlides" className="caseStudySlides">
      <div>
        {Tag && (
          <div
            className="caseStudySlides__tag"
            style={{ color: TagColor?.color }}
          >
            <span>{Tag}</span>
          </div>
        )}

        <div className={`content text-center`}>
          {Heading && (
            <h2
              className="axil-display-1 layer1 custom-h1"
              style={HeadingColor?.color ? { color: HeadingColor.color } : {}}
            >
              {Heading}
            </h2>
          )}

          {Description && (
            <div
              className="layer2 subtitle custom-color"
              style={DescriptionColor?.color ? { color: DescriptionColor.color } : {}}
            >
              <p>{Description}</p>
            </div>
          )}
        </div>
      </div>
      {slides.length > 0 &&
        slides.map((slide, index) => (
          <CaseStudySlide
            slide={slide}
            Speed={Number(SliderSpeed)}
            key={index}
          />
        ))}
    </div>
  );
};

export default CaseStudySlides;
