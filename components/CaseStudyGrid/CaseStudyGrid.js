import SectionTitle from '../common/SectionTitle';
import React, { useEffect, useState,useMemo} from 'react';
import Link from 'next/link';
import { formatDateString } from '../../helpers/utilities';
import { DateTime } from 'luxon';

const CaseStudyGrid = () => {
  let caseStudyData;
  const [mouseLeaveTab, setMouseLeaveTab] = useState(null);

  try {
    caseStudyData = require('../../data/CaseStudyGrid/CaseStudyGrid.json');
  } catch (error) {
    console.error('caseStudyData.json not found:', error);
    caseStudyData = null;
  }

  // ✅ Use local JSON data directly
  const caseStudy = useMemo(() => {
    if (!caseStudyData?.caseStudies) return [];
  
    return caseStudyData.caseStudies
      .map((study) => ({
        ...study,
        full_slug: study?.full_slug,
        published_at: study?.published_at,
      }))
      .sort((a, b) => {
        const beforeDate = DateTime.fromISO(a.published_at).toMillis();
        const afterDate = DateTime.fromISO(b.published_at).toMillis();
        return afterDate - beforeDate;
      });
  }, [caseStudyData]);
  

  const [activeTab, setActiveTab] = useState('All');
  const [activeCards, setActiveCards] = useState([]);
  const [labels, setLabels] = useState([]);

  // ✅ Get unique labels
  const getAllCaseStudyLabels = (caseStudies) => {
    const labelSet = new Set();
    labelSet.add('All');
    caseStudies?.forEach((caseStudy) => {
      caseStudy?.CaseStudyLabels?.forEach((label) => labelSet.add(label));
    });
    return Array.from(labelSet);
  };

  // ✅ Filter by selected label
  const filterCaseStudiesByLabel = (caseStudies, selectedLabel) => {
    if (!selectedLabel || selectedLabel === 'All') return caseStudies || [];
    return (
      caseStudies?.filter((caseStudy) =>
        caseStudy?.CaseStudyLabels?.includes(selectedLabel)
      ) || []
    );
  };

  useEffect(() => {
    const allLabels = getAllCaseStudyLabels(caseStudy);
    setLabels(allLabels);
  }, [caseStudy]);

  useEffect(() => {
    const filteredCaseStudies = filterCaseStudiesByLabel(caseStudy, activeTab);
    setActiveCards(filteredCaseStudies);
  }, [activeTab,caseStudy]);

  return (
    <div className="caseStudyGrid">
      <div className="caseStudyGrid__container container">
        <SectionTitle
          subtitle="Case Studies"
          title="Our Work"
          description="Explore our successful case studies showcasing business growth and innovation."
          alignment="center"
          titleColor=""
          descriptionColor=""
        />

        <div className="caseStudyGrid__tabs">
          <ul>
            {labels?.map((tab, index) => (
              <li
                key={index}
                className={`caseStudyGrid__tab`}
                onClick={() => setActiveTab(tab)}
              >
                <button
                  style={
                    activeTab === tab
                      ? { color: '#ffffff', backgroundColor: '#000248' }
                      : {}
                  }
                  className="caseStudyGrid__tab-btn"
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`caseStudyGrid__wrapper ${
            activeCards?.length >= 1 ? '' : 'no-result'
          }`}
        >
          {activeCards?.length >= 1 ? (
            activeCards.map((caseStudyDetails, index) => (
              <Link key={index} href={caseStudyDetails?.full_slug || '/'}>
                <div
                  className={`caseStudyGrid__card ${
                    mouseLeaveTab === index ? 'mouseleave' : ''
                  }`}
                  style={{
                    backgroundImage: `url(${caseStudyDetails?.CoverImage})`,
                  }}
                  onMouseEnter={() => {
                    setTimeout(() => setMouseLeaveTab(null), 450);
                  }}
                  onMouseLeave={() => {
                    setMouseLeaveTab(index);
                    setTimeout(() => setMouseLeaveTab(null), 450);
                  }}
                >
                  <div className="caseStudyGrid__card-content">
                    {caseStudyDetails?.Title && (
                      <h3>
                        {caseStudyDetails?.Title}{' '}
                        <span className="d-md-none fas fa-external-link-alt"></span>
                      </h3>
                    )}
                    {caseStudyDetails?.Description && (
                      <p className="clamped-texts">
                        {caseStudyDetails?.Description}
                      </p>
                    )}
                    <div
                      id="caseStudyBtn"
                      className="axil-button-group caseStudyGrid__card-btn"
                    >
                      <button className="hoverable axil-button casestudy_btn axil-button btn-solid btn-medium">
                        <span className={`button-text hoverable px-0`}>
                          {caseStudyDetails?.Label || 'Read Case Study'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-result">No Result Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyGrid;
