import Image from 'next/image';
import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { placeholderLight } from '../../helpers/utilities';

const CaseStudySlide = (props) => {
  const { slide, Speed } = props;
  const safeSlide = slide || {};
  console.log('slide', safeSlide)
  const animation = { duration: Speed, easing: (t) => t };
  const [sliderRef] = useKeenSlider({
    slides: { perView: 2.5 },
    breakpoints: {
      '(min-width: 579px)': { slides: { perView: 1.8 } },
      '(min-width: 768px)': { slides: { perView: 2.5 } },
      '(min-width: 991px)': { slides: { perView: 2.2 } },
      '(min-width: 1200px)': { slides: { perView: 2.2 } },
      '(min-width: 1400px)': { slides: { perView: 2.5 } },
      '(min-width: 1600px)': { slides: { perView: 2.8 } },
      '(min-width: 1800px)': { slides: { perView: 3 } },
      '(min-width: 2200px)': { slides: { perView: 4 } },
    },
    rtl: safeSlide.RightToLeft || false,
    loop: true,
    renderMode: 'performance',
    drag: true,
    created(s) { s.moveToIdx(8, true, animation); },
    updated(s) { s.moveToIdx(s.track.details.abs + 8, true, animation); },
    animationEnded(s) { s.moveToIdx(s.track.details.abs + 8, true, animation); },
  });

  return (
    <div>
      <div className="clients">
        <div className="clients__carousel pt_sm--0 pb_sm--0">
          <div className="clients__list">
            <div ref={sliderRef} className="keen-slider">
              {safeSlide?.images?.length > 0 &&
                [...safeSlide.images, ...safeSlide.images].map((item, index) => (
                  <div key={`brand-${index}`} className="clients__image keen-slider__slide">
                    <div className="clients__img">
                      <Image
                        loading="lazy"
                        blurDataURL={placeholderLight}
                        width={590}
                        height={332}
                        src={item?.Image?.filename || item?.ImageLink?.filename}
                        alt={item?.Image?.alt || 'slide'}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySlide;
