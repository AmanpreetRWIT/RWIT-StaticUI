import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/legacy/image';
import { getImageDimension } from '../../helpers/utilities';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const OurGallery = ({ blok }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorSize = 15;

  const CursurBackgroundColor = blok?.CursorColor?.color;
  const CursorIconColor = blok?.CursorTextColor?.color;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 40, stiffness: 300, mass: 1 };
  const delayOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const delaySmallOptions = { damping: 60, stiffness: 300, mass: 1.5 };

  const delaySmallMouse = {
    x: useSpring(mouse.x, delaySmallOptions),
    y: useSpring(mouse.y, delaySmallOptions),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const delayMouse = {
    x: useSpring(mouse.x, delayOptions),
    y: useSpring(mouse.y, delayOptions),
  };

  const manageMouseMove = ((e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  },[mouse.x, mouse.y]);

  useEffect(() => {
    let timeoutId;
    let isMoving = true;
    let lastMoveTime = Date.now();

    const handleMouseMove = (e) => {
      manageMouseMove(e);
      isMoving = true;
      lastMoveTime = Date.now();

      const customCursors = document.querySelectorAll('.cursor');
      customCursors?.forEach((cursor, index) => {
        cursor.classList.remove('cursor-bounce');
        gsap.killTweensOf(cursor);
        if (isMoving) {
          gsap.to(cursor, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.inOut',
          });
        }
      });

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (Date.now() - lastMoveTime >= 1500) {
          isMoving = false;

          customCursors?.forEach((cursor, index) => {
            if (cursor) {
              gsap.to(cursor, {
                scale: `1.3 + 0.${index + 2}`,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
              });
            }
          });
        }
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
      gsap.killTweensOf('.cursor-bounce');
    };
  }, [manageMouseMove]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [manageMouseMove]);

  const ImageLimit = (layout) => {
    switch (layout) {
      case '1':
        return '2';
      case '2':
        return '3';
      case '3':
        return '2';
      case '4':
        return '1';
      case '5':
        return '2';
      case '6':
        return '3';
      default:
        return '1';
    }
  };

  const [isScrolling, setIsScrolling] = useState(false);
  const swiperRef = useRef(null);

  const handleSlideChangeTransitionStart = () => setIsScrolling(true);
  const handleSlideChangeTransitionEnd = () => setIsScrolling(false);

  useEffect(() => {
    const swiperWrapper = document.querySelector(
      '.watery-container > .swiper-wrapper'
    );
    const totalWidth = swiperWrapper?.scrollWidth + swiperWrapper?.clientWidth / 2;
    swiperRef?.current?.swiper?.slideTo(0);

    gsap.registerPlugin(ScrollTrigger);

    if (!isMobile) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: swiperWrapper,
        start: 'top 20%',
        end: `+=${totalWidth}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(swiperWrapper, {
            x: -progress * (totalWidth - window.innerWidth),
            ease: 'power2.out',
            duration: 1,
          });
        },
      });

      return () => scrollTrigger.kill();
    }
  }, [isMobile,manageMouseMove]);

  return (
    <div
      className="axil-call-to-action-area shape-position gl-section-gap d-flex align-items-center"
      style={
        blok?.BgColor?.color
          ? { backgroundColor: blok.BgColor.color, zIndex: '1', cursor: 'none' }
          : { cursor: 'none' }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container" id="gallery">
        <SectionTitle
          subtitle={blok?.Tags}
          title={blok?.Title || ''}
          titleColor={blok?.TitleColor?.color || ''}
          alignment="center"
          showTitle={blok?.showTitle}
        />

        <div className="slider-container">
          <Swiper
            slidesPerView={'auto'}
            pagination={{ clickable: false, el: null }}
            speed={1200}
            loop={blok?.Loop ? true : false}
            watchSlidesProgress={true}
            freeMode={true}
            draggable={true}
            modules={[FreeMode, Pagination]}
            className={`mySwiper watery-container`}
            ref={swiperRef}
            onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
            onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
            style={{ cursor: 'none' }}
          >
            <>
              <motion.div
                style={{
                  left: smoothMouse.x,
                  top: smoothMouse.y,
                  opacity: isHovered ? 0.7 : 0,
                  background: CursorIconColor || CursurBackgroundColor || '#2690D4',
                  height: '20px',
                  width: '20px',
                  transform: 'translate(12%, -40%)',
                }}
                className="cursor"
              ></motion.div>
              <motion.div
                style={{
                  left: delayMouse.x,
                  top: delayMouse.y,
                  height: '40px',
                  width: '40px',
                  opacity: isHovered ? 0.4 : 0,
                  background: CursurBackgroundColor || '#2690D4',
                  zIndex: 1,
                  transform: 'translate(-20%, -45%)',
                }}
                className="cursor cursor-large"
              ></motion.div>
            </>

            {blok?.Slide?.map((item, index) => (
              <SwiperSlide
                style={{ overflow: 'hidden' }}
                key={index}
                className={item?.Layout ? `layout_${item.Layout}` : `layout_4`}
              >
                <div className="img_wrap" style={{ width: '100%' }}>
                  <div className={`img_style1`}>
                    {item?.ImageA?.filename && (
                      <Image
                        src={item.ImageA.filename}
                        alt="Shape image"
                        width={getImageDimension(item.ImageA.filename).width}
                        height={getImageDimension(item.ImageA.filename).height}
                      />
                    )}

                    {item?.ImageB?.filename && ImageLimit(item.Layout) >= '2' && (
                      <div className={`img_style2`}>
                        <Image
                          src={item.ImageB.filename}
                          alt="Shape image"
                          width={getImageDimension(item.ImageB.filename).width}
                          height={getImageDimension(item.ImageB.filename).height}
                        />
                      </div>
                    )}

                    {item?.ImageC?.filename && ImageLimit(item.Layout) == '3' && (
                      <div className={`img_style3`}>
                        <Image
                          src={item.ImageC.filename}
                          alt="Shape image"
                          width={getImageDimension(item.ImageC.filename).width}
                          height={getImageDimension(item.ImageC.filename).height}
                        />
                      </div>
                    )}
                    {item?.ImageD?.filename && ImageLimit(item.Layout) == '4' && (
                      <div className={`img_style4`}>
                        <Image
                          src={item.ImageD.filename}
                          alt="Shape image"
                          width={getImageDimension(item.ImageD.filename).width}
                          height={getImageDimension(item.ImageD.filename).height}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default OurGallery;
