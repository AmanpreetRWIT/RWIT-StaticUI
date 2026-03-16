export const animation = { duration: 14000, easing: (t) => t };

const handleSliderMove = (s) => {
  s.moveToIdx(s?.track?.details?.abs + 5, true, animation);
};

export const getAutoSliderOptions = (setLoaded, customOptions = {}) => ({
  loop: true,
  ...customOptions,
  created(s) {
    if (setLoaded) setLoaded(true);
    s.moveToIdx(5, true, animation);
  },
  updated: handleSliderMove,
  animationEnded: handleSliderMove,
});
