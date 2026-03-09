import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

const VideoCard = ({ data, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      const video = videoRef.current;
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className='video-testimonial__card'>
      {(data?.Video?.filename || data?.embeddedCode) && (
        <div className='video-testimonial__media'>
          {!data?.isEmbedded && (
            <video
              ref={videoRef}
              src={data?.Video?.filename}
              className='video-testimonial__video'
              controls={isPlaying}
              playsInline
              preload='auto'
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          )}
          {data?.isEmbedded && (
            <div
              className='video-testimonial__video'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.embeddedCode, {
                  ADD_TAGS: ['iframe'],
                  ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
                }),
              }}
            />
          )}

          {!isPlaying && !data?.isEmbedded && (
            <button
              type='button'
              className='video-testimonial__overlay'
              onClick={togglePlay}
              aria-label='Play video'
            >
              <Image
                src='/images/play.svg'
                alt='Play'
                width={22}
                height={26}
                className='video-testimonial__play-btn'
              />
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className='video-testimonial__content'>
        {data?.Quote && (
          <>
            <Image
              src='/images/quote-blue.svg'
              className='video-testimonial__quote-icon'
              alt='Quote'
              width={21}
              height={15}
            />
            <p className='video-testimonial__quote'>{data?.Quote}</p>
          </>
        )}

        <div className='video-testimonial__author'>
          {data?.authorImage?.filename && (
            <Image
              className='video-testimonial__author-image'
              src={data?.authorImage?.filename}
              alt={data?.authorName}
              width={46}
              height={46}
            />
          )}
          {data?.authorName && (
            <div className='video-testimonial__author-info'>
              <strong className='video-testimonial__author-name'>{data?.authorName}</strong>
              <span className='video-testimonial__author-role'>{data?.authorRole}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
