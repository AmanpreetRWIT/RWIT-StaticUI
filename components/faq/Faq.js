import { useState, useEffect } from 'react';
import SectionTitle from '/components/common/SectionTitle';
import MenuIcon from '../Icons/MenuIcon';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Faq = ({ Title,FaqDescriptionColor, Tags, Description, BGColor, TitleColor, DescriptionColor, FaqCardTitleColor, FaqCard }) => {
  const [isOpen, setIsOpen] = useState(0);
  const faqCardTitleColor = FaqCardTitleColor?.color
    ? FaqCardTitleColor?.color
    : '';

  const router = useRouter();

  useEffect(() => {
    const Cards = document.querySelectorAll('.card');
    Cards?.forEach((card) => {
      card?.classList?.remove('activefaq');
    });

    const activeBlock = document.querySelector('.show');
    const faqs = document.querySelectorAll('.axil-faq-area .card .collapsed');
    faqs?.forEach((faq) => {
      if (faq?.classList?.contains('show')) {
        faq.style.maxHeight = faq.scrollHeight + 'px';
      } else {
        faq.style.maxHeight = null;
      }
    });
    if (activeBlock) {
      activeBlock?.parentElement?.classList?.add('activefaq');
    }
  }, [isOpen, router?.asPath]);

  const faqData = FaqCard?.map((faq) => {
    let answer = '';
    faq?.Description?.content?.map((ans) =>
      ans?.content?.forEach(
        (val, i, arr) => (answer += val?.text + (i < arr.length - 1 ? ' ' : ''))
      )
    );
    return {
      question: faq?.Heading,
      answer: answer,
    };
  });

  return (
    <>
      <Head>
        {faqData && faqData?.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{ 
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": ${JSON.stringify(
              faqData?.map((faq, i, arr) => {
                return {
                  type: 'Question',
                  name: faq?.question,
                  acceptedAnswer: {
                    type: 'Answer',
                    text: faq?.answer,
                  },
                };
              })
            )}
            }`,
            }}
          />
        )}
      </Head>
      <div
        className="axil-faq-area ax-section-gap bg-color-white"
        style={BGColor?.color ? { background: BGColor?.color } : {}}
      >
        <div className={`container`}>
          <div className="row">
            <div className="col-lg-12">
              <SectionTitle
                title={Title}
                subtitle={Tags}
                description={Description}
                alignment="center"
                titleColor={TitleColor?.color}
                descriptionColor={
                  DescriptionColor?.color
                    ? DescriptionColor?.color
                    : ''
                }
              />
            </div>
          </div>
          <div className={`row mt--60 max-sm:mt-30 `}>
            <div className="col-lg-8 offset-lg-2">
              <div
                id="accordion"
                className={`axil-accordion--2 `}
                style={faqCardTitleColor ? { color: faqCardTitleColor } : {}}
              >
                {FaqCard &&
                  FaqCard?.map((service, index) => (
                    <div className="card" key={index}>
                      <div
                        className={`card-header ${
                          faqCardTitleColor ? faqCardTitleColor : ''
                        }`}
                        id={`heading-${index}`}
                      >
                        <a
                          href="#"
                          className="btn btn-link d-block text-start"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${index}`}
                          aria-expanded="true"
                          aria-controls={`collapse-${index}`}
                          onClick={() => setIsOpen(index)}
                          style={
                            faqCardTitleColor
                              ? { color: faqCardTitleColor }
                              : {}
                          }
                        >
                          {service?.Heading}
                          <MenuIcon color="#007aff" />
                        </a>
                      </div>
                      <div
                        id={`#collapse-${index}`}
                        className={`collapsed ${isOpen == index ? 'show' : ''}`}
                        aria-labelledby={`heading-${index}`}
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          {service?.Description?.content?.map((ans, ansIndex) =>
                            ans?.content?.map((val, valIndex) => (
                              <span key={valIndex} style={FaqDescriptionColor}>{val?.text}</span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
