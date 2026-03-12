import Image from 'next/image';
import SectionTitle from '../common/SectionTitle';
import Link from 'next/link';

const ClientFeedback = ({ blok }) => {
  return (
    <div
      className='client-feedback axil-featured-area'
      style={{
        background: blok?.BGColor?.color,
        '--desktop-top-padding': blok?.TopPadding ? `${blok.TopPadding}px` : undefined,
        '--desktop-bottom-padding': blok?.BottomPadding ? `${blok.BottomPadding}px` : undefined,
      }}
    >
      <div className='container'>
        <div className='mb--50'>
          <SectionTitle
            title={blok?.Heading}
            alignment={blok?.TextAlignment || 'center'}
            titleColor={blok?.HeadingColor?.color || ''}
            subtitle={blok?.Tags}
          />
          {blok?.Description && (
            <div
              className='section-title text-center custom-color'
              style={{ color: blok?.DescriptionColor?.color }}
            >
              {(blok?.Description)}
            </div>
          )}
        </div>
        <div
          className={`client-feedback-card text-center ${blok?.CardShadow ? 'card-shadow' : ''}`}
          style={{
            background: blok?.CardBgColor?.color ? blok?.CardBgColor?.color : '',
          }}
        >
          {blok?.FeedbackText && (
           <div
           className="client-feedback-content subtitle-2"
           dangerouslySetInnerHTML={{ __html: blok?.FeedbackText }}
         />
          )}
          <div className='client-details-wrapper'>
            <div className='client-details'>
              {blok?.ProfileImage?.filename && (
                <Image
                  src={blok?.ProfileImage?.filename}
                  alt={blok?.ProfileImage?.alt ?? 'Client Profile'}
                  width={64}
                  height={64}
                  className='client-info-profile'
                />
              )}
              <div className='client-info'>
                {blok?.Name && <h5 className='title subtitle-2'>{blok?.Name}</h5>}
                {blok?.Designation && <p className='designation'>{blok?.Designation}</p>}
              </div>
            </div>
            {blok?.CaseStudyLogo?.filename && (
              <div className='case-study-logo'>
                <Image
                  src={blok?.CaseStudyLogo?.filename}
                  alt={blok?.CaseStudyLogo?.alt ?? 'Case Study Logo'}
                  width={208}
                  height={64}
                />
              </div>
            )}
            <div className='review-platform-wrapper'>
              <div className='review-platform'>
                {blok?.PlatformLogo?.filename && (
                  <div className='review-platform-logo'>
                    <Image
                      src={blok?.PlatformLogo?.filename}
                      alt={blok?.PlatformLogo?.alt ?? 'Platform logo'}
                      width={85}
                      height={24}
                    />
                  </div>
                )}
                {blok?.PlatformRating && (
                  <div className='review-platform-ratings'>
                    <div className='star-icon'>
                      <Image src='/images/star.svg' alt='Rating star' width={24} height={24} />
                    </div>
                    <p className='review-platform-text'>{blok?.PlatformRating} Ratings</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFeedback;
