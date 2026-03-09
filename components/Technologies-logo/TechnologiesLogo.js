import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const TechnologyLogos = ({ logos }) => {
  const containerRef = useRef(null);
  const logosRef = useRef(new Map());

  useLayoutEffect(() => {
    const container = containerRef.current;
    const logoElements = Array.from(logosRef.current.values());
    if (!container || logoElements.length === 0) return;

    const FIXED_MOVE_DURATION = 6; // seconds; increase to slow down, decrease to speed up

    const rectsOverlap = (a, b) => {
      return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
    };

    const getElRect = (el) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = el._gsap && typeof el._gsap.x === 'number' ? el._gsap.x : 0;
      const y = el._gsap && typeof el._gsap.y === 'number' ? el._gsap.y : 0;
      return { left: x, top: y, right: x + w, bottom: y + h, width: w, height: h };
    };

    const findNonOverlappingTarget = (w, h, existingRects, maxX, maxY, attempts = 30) => {
      for (let i = 0; i < attempts; i++) {
        const tx = Math.random() * maxX;
        const ty = Math.random() * maxY;
        const candidate = { left: tx, top: ty, right: tx + w, bottom: ty + h };
        let ok = true;
        for (const r of existingRects) {
          if (rectsOverlap(candidate, r)) {
            ok = false;
            break;
          }
        }
        if (ok) return { x: tx, y: ty };
      }
      return { x: Math.random() * maxX, y: Math.random() * maxY };
    };

    const activeTweens = [];
    const activeDelayed = [];
    const animateFns = [];

    logoElements.forEach((el, index) => {
      const logoWidth = el.offsetWidth;
      const logoHeight = el.offsetHeight;

      const initMaxX = Math.max(container.clientWidth - logoWidth, 0);
      const initMaxY = Math.max(container.clientHeight - logoHeight, 0);

      const existingRects = logoElements.slice(0, index).map((other) => getElRect(other));

      const initPos = findNonOverlappingTarget(
        logoWidth,
        logoHeight,
        existingRects,
        initMaxX,
        initMaxY,
        40
      );
      gsap.set(el, {
        x: initPos.x,
        y: initPos.y,
      });

      const animateLogo = () => {
        const maxX = Math.max(container.clientWidth - logoWidth, 0);
        const maxY = Math.max(container.clientHeight - logoHeight, 0);

        const existing = logoElements
          .filter((other, i) => i !== index)
          .map((other) => getElRect(other));

        const target = findNonOverlappingTarget(logoWidth, logoHeight, existing, maxX, maxY, 30);
        const targetX = target.x;
        const targetY = target.y;

        const tween = gsap.to(el, {
          x: targetX,
          y: targetY,
          duration: FIXED_MOVE_DURATION,

          ease: 'power1.inOut',
          onComplete: animateLogo,
        });
        activeTweens[index] = tween;
      };

      animateFns[index] = animateLogo;

      const startDelay = index * 0.18 + Math.random() * 0.6;
      activeDelayed[index] = gsap.delayedCall(startDelay, animateLogo);
    });

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      activeTweens.forEach((t) => t && t.kill());
      activeDelayed.forEach((d) => d && d.kill());

      logoElements.forEach((el, idx) => {
        const logoWidth = el.offsetWidth;
        const logoHeight = el.offsetHeight;

        const safeX = Math.max(0, Math.min(el._gsap?.x || 0, width - logoWidth));
        const safeY = Math.max(0, Math.min(el._gsap?.y || 0, height - logoHeight));

        gsap.to(el, {
          x: safeX,
          y: safeY,
          duration: 0.45,
          ease: 'power2.out',
        });

        const restartDelay = Math.random() * 0.6 + idx * 0.05;
        if (typeof animateFns[idx] === 'function') {
          activeDelayed[idx] = gsap.delayedCall(restartDelay, animateFns[idx]);
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);

      try {
        if (typeof activeTweens !== 'undefined') activeTweens.forEach((t) => t && t.kill());
        if (typeof activeDelayed !== 'undefined') activeDelayed.forEach((d) => d && d.kill());
      } catch (e) {
        // ignore
      }
    };
  }, [logos]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      className='logos-container'
    >
      {logos.map((logo) => (
        <div
          key={logo.Image.filename || index} // Using a stable key
          ref={(node) => {
            const map = logosRef.current;
            if (node) {
              map.set(logo.Image.filename, node);
            } else {
              map.delete(logo.Image.filename);
            }
          }}
          style={{
            position: 'absolute',
          }}
          className={`casestudylogo_wrapper`}
        >
          <Image
            loading='lazy'
            width={60}
            height={60}
            src={logo?.Image?.filename}
            alt={logo?.Image?.alt || 'logo'}
          />
        </div>
      ))}
    </div>
  );
};

export default TechnologyLogos;
