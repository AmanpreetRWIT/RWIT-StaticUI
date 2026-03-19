import SectionTitle from "../common/SectionTitle";
import React, { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { formatDateString } from "../../helpers/utilities";
import { DateTime } from "luxon";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyList from "./CaseStudyList";
const iconMap = {
  all: "all-tech.svg",
  webflow: "webflow.svg",
  nextjs: "next-js.svg",
  "next-js": "next-js.svg",
  prismic: "prismic.svg",
  sanity: "sanity.svg",
  "headless-cms": "headless-cms.svg",
  headlesscms: "headless-cms.svg",
  builder: "builder.svg",
  builderio: "builder.svg",
  wordpress: "wordpress.svg",
  storyblok: "storyblok.svg",
};

let caseStudyData = null;
try {
  caseStudyData = require("../../public/caseStudyData.json");
} catch (error) {
  console.error("caseStudyData.json not found:", error);
}

const CaseStudyGrid = ({blok}) => {
  const [mouseLeaveTab, setMouseLeaveTab] = useState(null);

  const caseStudy = useMemo(() => {
    const latestData = caseStudyData
      ? caseStudyData?.stories?.flatMap((study) =>
          study?.content?.body
            ?.filter((content) => content?.component === "CaseStudyDetails")
            ?.map((caseStudyDetail) => ({
              ...caseStudyDetail,
              full_slug: study?.full_slug,
              published_at: study?.first_published_at,
            }))
            ?.sort((a, b) => {
              const beforeDate = DateTime.fromFormat(
                formatDateString(a.published_at),
                "MMMM dd yyyy",
              ).toMillis();
              const afterDate = DateTime.fromFormat(
                formatDateString(b.published_at),
                "MMMM dd yyyy",
              ).toMillis();
              return afterDate - beforeDate;
            }),
        )
      : [];

    const mapCaseStudyGridCard = (studies) => {
      return studies?.map((study) => {
        const matchedCaseStudy = caseStudyData?.stories?.find(
          (caseStudy) => caseStudy?.uuid === study.CaseStudy,
        );
        const caseStudyDetails = matchedCaseStudy?.content.body?.find(
          (content) => content?.component === "CaseStudyDetails",
        );
        return {
          ...caseStudyDetails,
          full_slug: matchedCaseStudy?.full_slug,
          published_at: matchedCaseStudy?.published_at,
        };
      });
    };

    if (blok?.CaseStudyGridCard?.length > 0) {
      return mapCaseStudyGridCard(blok.CaseStudyGridCard);
    } else if (blok?.CaseStudies?.length > 0) {
      return blok.CaseStudies.flatMap((study) =>
        study?.content?.body
          ?.filter((content) => content?.component === "CaseStudyDetails")
          ?.map((caseStudyDetail) => ({
            ...caseStudyDetail,
            full_slug: study?.full_slug,
            published_at: study?.first_published_at,
          })),
      );
    } else {
      return latestData;
    }
  }, []);

  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef(null);

  // Function to get all case study labels
  const getAllCaseStudyLabels = (caseStudies) => {
    const labelSet = new Set();
    labelSet?.add("All");

    blok?.CategoryTab?.length > 0
      ? blok?.CategoryTab?.forEach((tab) => labelSet?.add(tab))
      : caseStudies?.forEach((caseStudy) => {
          // Add each label to the Set
          caseStudy?.CaseStudyLabels?.forEach((label) => {
            labelSet?.add(label);
          });
        });
    // Convert the Set back to an array
    return Array?.from(labelSet);
  };

  const labels = useMemo(() => getAllCaseStudyLabels(caseStudy), [caseStudy]);

  const filterCaseStudiesByLabel = (caseStudies, selectedLabel) => {
    if (!selectedLabel || selectedLabel === "All") {
      return caseStudies || [];
    }

    // Filter case studies that contain the selected label
    return (
      caseStudies?.filter((caseStudy) =>
        caseStudy?.CaseStudyLabels?.includes(selectedLabel),
      ) || []
    );
  };

  const activeCards = useMemo(() => filterCaseStudiesByLabel(caseStudy, activeTab), [caseStudy, activeTab]);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  useEffect(() => {
    if (!activeCards || activeCards.length === 0) return;
    if (visibleCount >= activeCards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prevCount) => prevCount + 4);
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [activeCards, visibleCount]);

  return (
    <div className="caseStudyGrid">
      <div className="caseStudyGrid__container container">
        <SectionTitle
          subtitle={blok?.Tags}
          title={blok?.Heading}
          description={blok?.Description}
          alignment="center"
          titleColor={blok?.TitleColor?.color ? blok?.TitleColor?.color : ""}
          descriptionColor={
            blok?.DescriptionColor?.color ? blok?.DescriptionColor?.color : ""
          }
        />
        <div className="caseStudyGrid__tabs">
          <ul>
            {labels?.map((tab, index) => {
              const formattedLabel = tab
                ?.toLowerCase()
                ?.replace(/\s+/g, "-")
                ?.replace(/\./g, "");
              const iconSrc = iconMap[formattedLabel];
              return (
                <li
                  key={index}
                  className={`caseStudyGrid__tab`}
                  onClick={() => setActiveTab(tab)}
                >
                  <button
                    className={`caseStudyGrid__tab-btn ${!blok?.GridLayout ? "list" : ""} ${
                      activeTab === tab ? "active" : ""
                    }`}
                  >
                    {iconSrc && !blok?.GridLayout && (
                      <Image
                        src={`/images/${iconSrc}`}
                        alt={`${tab} icon`}
                        width={20}
                        height={20}
                      />
                    )}
                    {tab}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          key={activeTab}
          className={`caseStudyGrid__wrapper ${!blok?.GridLayout ? "listView" : ""} ${
            activeCards?.length >= 1 ? "" : "no-result"
          }`}
        >
          {activeCards?.length >= 1 ? (
            <>
              {activeCards
                .slice(0, visibleCount)
                .map((caseStudyDetails, index) => {
                  const caseStudyHref = caseStudyDetails?.full_slug || "/";
                  const isCaseStudyNoLocale =
                    /\/(blog|category|case-study|casestudies)(\/|$)|^(blog|category|case-study|casestudies)(\/|$)/.test(
                      caseStudyHref,
                    );
                  return blok?.GridLayout ? (
                    <CaseStudyCard
                      key={index}
                      caseStudyDetails={caseStudyDetails}
                      index={index}
                      mouseLeaveTab={mouseLeaveTab}
                      setMouseLeaveTab={setMouseLeaveTab}
                      href={caseStudyHref}
                      locale={isCaseStudyNoLocale ? false : undefined}
                    />
                  ) : (
                    <CaseStudyList
                      key={index}
                      caseStudyDetails={caseStudyDetails}
                      href={caseStudyHref}
                      locale={isCaseStudyNoLocale ? false : undefined}
                    />
                  );
                })}
              {visibleCount < activeCards.length && (
                <div
                  ref={loadMoreRef}
                  style={{
                    height: "20px",
                    width: "100%",
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    color: blok?.DescriptionColor?.color,
                  }}
                >
                  Loading...
                </div>
              )}
            </>
          ) : (
            <div className="no-result">No Result Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyGrid;
