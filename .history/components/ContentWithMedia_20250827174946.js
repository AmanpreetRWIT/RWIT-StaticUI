// import Image from 'next/legacy/image';

// import VideoPlayer from '../components/common/VideoPlayer';
// import { useState } from 'react';


// const ContentWithMedia = ({ blok }) => {
//   const [isWindow, setIsWindow] = useState(false);

//   const layout = (Layout) => {
//     if (Layout === 'flex-row')
//       return 'col-lg-6 col-xl-6 col-md-12 col-12  mt_md--30 mt_sm--30';
//     else if (Layout === 'style-2')
//       return 'col-lg-6 col-xl-6 offset-xl-1 col-md-12 col-12 order-1 order-lg-2';
//     else if (Layout === 'flex-column') return 'col-lg-8 offset-lg-2 ';
//     else if (Layout === 'flex-column-reverse') return 'col-lg-8 offset-lg-2';
//     else '';
//   };

//   const InnerLayout = (Layout) => {
//     if (Layout === 'flex-row')
//       return 'col-lg-6 col-xl-5 offset-xl-1 col-md-12 col-12';
//     else if (Layout === 'style-2')
//       return 'col-lg-6 col-xl-5 col-md-12 col-12 order-2 order-lg-1 mt_md--30 mt_sm--30';
//     else if (Layout === 'flex-column') return 'col-lg-8 offset-lg-2';
//     else if (Layout === 'flex-column-reverse') return 'col-lg-8 offset-lg-2';
//     else '';
//   };

//   return (
//     <div>
//       <div
//         className={`axil-project-brief project-bief-styles ax-section-gap bg-color-white  ${
//           blok?.GradientStyle || 'theme-gradient-3'
//         } ${blok?.Layout === 'style-2' ? 'order-style-2' : ''}`}
//         style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
//       >
//         <div className={`container`}>
//           <div
//             className={`row ${blok?.Layout} ${
//               blok?.Layout != 'flex-column' &&
//               blok?.Layout != 'flex-column-reverse'
//                 ? 'align-items-center'
//                 : ''
//             }`}
//           >
//             {(blok?.Image?.filename || blok?.Video?.filename) && (
//               <div className={`${layout(blok?.Layout)} content-media`}>
//                 {blok?.Image?.filename && (
//                   <div className="thumbnail position-relative mt--30 mb--30 thumbnail-img">
//                     <Image
//                       loading="lazy"
//                       width={700}
//                       height={530}
//                       className="image w-100 paralax-image"
//                       src={blok?.Image?.filename}
//                       alt={blok?.Image?.alt ? blok?.Image?.alt : 'blog image'}
//                     />
//                     {blok?.Video?.filename && (
//                       <div className="video-button position-to-top">
//                         <a
//                           className="play__btn video-btn"
//                           href=""
//                           data-bs-toggle="modal"
//                           data-bs-target="#exampleModal"
//                         >
//                           <span className="triangle" />
//                         </a>
//                       </div>
//                     )}

//                     {!blok.DisableBgShape && (
//                       <div>
//                         <div className="shape-group shape-01">
//                           <Image
//                             loading="lazy"
//                             width={257}
//                             height={179}
//                             src="/images/contact-01.svg"
//                             alt="Shape image"
//                           />
//                         </div>
//                         <div className="shape-group shape-02">
//                           <Image
//                             loading="lazy"
//                             width={410}
//                             height={424}
//                             src="/images/contact-03.svg"
//                             alt="Shape image"
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             <div
//               className={`content__wrap ${
//                 blok?.Image?.filename || blok?.Video?.filename
//                   ? InnerLayout(blok?.Layout)
//                   : 'col-lg-12'
//               }`}
//             >
//               <div className="content">
//                 {blok?.Tags && (
//                   <div className="section-title tag">
//                     {blok?.Tags && Array.isArray(blok?.Tags)
//                       ? blok?.Tags?.map((tag, index) => (
//                           <StoryblokComponent blok={tag} key={index} />
//                         ))
//                       : null}
//                   </div>
//                 )}
//                 <div className="inner">
//                   {blok?.Title && (
//                     <h2
//                       style={
//                         blok?.TitleColor?.color
//                           ? {
//                               color: blok?.TitleColor?.color,
//                             }
//                           : {}
//                       }
//                       className="title mb--20"
//                     >
//                       {blok?.Title}
//                     </h2>
//                   )}

//                   {blok?.Description && (
//                     <div
//                       className="custom-color desc"
//                       style={
//                         blok?.DescriptionColor?.color
//                           ? { color: blok?.DescriptionColor?.color }
//                           : {}
//                       }
//                     >
//                       {(blok?.Description)}
//                     </div>
//                   )}

//                   {blok.Button && (
//                     <div className="axil-button-group mt--40">
//                       {blok.Button &&
//                         blok.Button.map((Btn, index) => (
//                           <StoryblokComponent
//                             blok={Btn}
//                             key={'block' + index}
//                           />
//                         ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isWindow && blok?.Video?.filename && (
//         <VideoPlayer url={blok?.Video?.filename} />
//       )}
//     </div>
//   );
// };
// export default ContentWithMedia;
