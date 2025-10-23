// import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
// import { useState, useEffect, useRef } from 'react';

// const LoadOnScroll = ({ blok }) => {
//   const [initialBloks, setInitialBloks] = useState(
//     parseInt(blok?.ShowInitialItems || 4)
//   );
//   const [isVisible, setIsVisible] = useState(true);
//   const intersectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//           }
//         });
//       },
//       {
//         threshold: 0.01,
//       }
//     );

//     if (intersectionRef.current) {
//       observer.observe(intersectionRef.current);
//     }

//     return () => {
//       if (intersectionRef.current) {
//         observer.unobserve(intersectionRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       setInitialBloks((prevInitialBloks) => prevInitialBloks + 2);
//       setIsVisible(false);
//     }
//   }, [isVisible]);

//   return (
//     <>
//       <section className="blok-wrapper" {...storyblokEditable(blok)}>
//         {blok?.Block &&
//           blok?.Block?.slice(0, initialBloks)?.map((nestedBlok) => (
//             <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
//           ))}
//       </section>
//     </>
//   );
// };

// export default LoadOnScroll;
