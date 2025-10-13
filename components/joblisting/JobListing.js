import React, { useEffect, useState, useRef } from 'react';
import SectionTitle from '../common/SectionTitle';
import Image from 'next/image';
import Tag from '../common/Tag';
import Link from 'next/link';
import careerData from '../../public/careerData.json';
import { useMobile } from '../../helpers/utilities';

const JobListing = ({ data,Title,Tags }) => {
  const [basePath, setBasePath] = useState('');
  const [showSocials, setShowSocials] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const shareOptionsRef = useRef(null);
  const isMobile = !useMobile();

  const handleClickOutside = (event) => {
    if (
      shareOptionsRef?.current &&
      !shareOptionsRef?.current?.contains(event?.target)
    ) {
      setShowSocials(false);
      setSelectedIndex(null);
    }
  };

  useEffect(() => {
    setBasePath(window?.location?.host);
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <div
      id="job-listing"
      className="axil-slider-area ax-section-gap--lg"
      style={data?.BGColor?.color ? { background: data.BGColor.color } : { background: '#EEF0FA' }}
    >
      <div className={`container callback-container`}>
        <div className="jobs-header">
          <SectionTitle
            title={Title}
            subtitle={Tags}
            alignment="center"
          />
          {data?.Description && (
            <div
              className="layer2 custom-color"
              style={data?.DescriptionColor?.color ? { color: data.DescriptionColor.color } : {}}
            >
              {(data.Description)}
            </div>
          )}
        </div>
        {careerData?.data?.length > 0 ? (
          <div className="jobs-grid">
            {careerData?.data?.map((career, index) => {
              const job = career?.content;
              const jobTags =
                job?.JobTag?.length > 2
                  ? [
                      ...(!isMobile ? job?.JobTag?.slice(0, 1) : job?.JobTag?.slice(0, 2)),
                      {
                        ...(!isMobile ? job?.JobTag[1] : job?.JobTag[2]),
                        TagName: `+${job?.JobTag?.length - (!isMobile ? 1 : 2)} more`,
                      },
                    ]
                  : job?.JobTag;
              return (
                <div className="job-card" key={index}>
                  <div className="job-info">
                    <div className="job-header">
                      {job?.Logo?.filename && (
                        <div className="job-logo">
                          <Image
                            src={job?.Logo.filename}
                            alt={data?.Logo?.alt || 'job-logo'}
                            width={60}
                            height={60}
                          />
                        </div>
                      )}
                      <div className="job-content">
                        <div>
                          {job?.CareerHeading && <h3>{job?.CareerHeading}</h3>}
                          {job?.location && <p className="job-location">{job?.location}</p>}
                        </div>
                        <div
                          className="share-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSocials(true);
                            setSelectedIndex(index);
                          }}
                          tabIndex={0}
                        >
                          <Image
                            src="/images/share.svg"
                            alt="Share icon"
                            width={24}
                            height={24}
                          />
                          {showSocials && selectedIndex === index && (
                            <div className="share-options" ref={shareOptionsRef}>
                              <ul className="share-list">
                                <li>
                                  <Link
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${basePath}/${career?.full_slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fab fa-facebook-f" />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`https://twitter.com/intent/tweet?url=${basePath}/${career?.full_slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.6953 15.9827L9.67676 7.21045L9.68703 7.21867L15.1136 0.931274H13.3002L8.87956 6.04876L5.36904 0.931274H0.613109L6.23196 9.12132L6.23128 9.12062L0.305176 15.9827H2.11859L7.03329 10.2892L10.9393 15.9827H15.6953ZM4.65052 2.29958L13.0949 14.6144H11.6578L3.20666 2.29958H4.65052Z"
                                        fill="#050148"
                                      />
                                    </svg>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${basePath}/${career?.full_slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fab fa-linkedin-in" />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigator.clipboard.writeText(basePath + '/' + career?.full_slug);
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon-xs"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523   20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                                        fill="#050148"
                                      ></path>
                                    </svg>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {isMobile && job?.Description && (
                      <div className="job-description">{(job?.Description)}</div>
                    )}
                    {job?.JobTag.length > 0 && (
                      <div className="job-tags section-title">
                        {jobTags?.map((tag, index) => (
                          <Tag key={index} blok={tag} />
                        ))}
                      </div>
                    )}
                    <div className="job-footer">
                      {career?.created_at && (
                        <span className="job-date">{career.created_at.split('T')[0]}</span>
                      )}
                      <Link
                        href={career?.full_slug}
                        className="hoverable axil-button axil-button btn-solid btn-medium"
                      >
                        <span className={`button-text hoverable px-0`}>Read More...</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center pt--50 pb--50">
            <p className="h4">
              {data?.EmptyCardMsg || 'Sorry, no jobs available at this time. Please visit after some time.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
