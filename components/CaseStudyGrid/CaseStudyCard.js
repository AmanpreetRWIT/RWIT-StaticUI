import React from 'react';
import Link from 'next/link';

const CaseStudyCard = ({
  caseStudyDetails,
  index,
  mouseLeaveTab,
  setMouseLeaveTab,
  href,
  locale,
}) => {
  return (
    <Link href={href} locale={locale} className='caseStudy__cases' legacyBehavior={false}>
      <div
        className={`caseStudyGrid__card ${mouseLeaveTab === index ? 'mouseleave' : ''}`}
        style={{
          backgroundImage: `url(${
            caseStudyDetails?.CoverImage?.filename || caseStudyDetails?.Image?.filename
          })`,
        }}
        onMouseEnter={() => {
          setTimeout(() => setMouseLeaveTab(null), 450);
        }}
        onMouseLeave={() => {
          setMouseLeaveTab(index);
          setTimeout(() => setMouseLeaveTab(null), 450);
        }}
      >
        <div className='caseStudyGrid__card-content'>
          {caseStudyDetails?.Title && (
            <h3>
              {caseStudyDetails?.Title} <span className='d-md-none fas fa-external-link-alt'></span>
            </h3>
          )}
          {caseStudyDetails?.Description && (
            <p className='clamped-texts'>{caseStudyDetails?.Description}</p>
          )}
          <div className='axil-button-group caseStudyGrid__card-btn caseStudyBtn'>
            <button className='hoverable axil-button casestudy_btn btn-solid btn-medium  '>
              <span className={`button-text hoverable px-0`}>
                {caseStudyDetails?.Label || 'Read Case Study'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
