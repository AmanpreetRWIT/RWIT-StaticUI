import { useRef, useState, useEffect } from 'react';
import { handleRecaptchaV2, handleRecaptchaV3 } from '../utils/recaptcha';

/**
 * Custom hook for managing reCAPTCHA v3 and v2 fallback flow
 * Handles initialization, state management, and verification logic
 * @returns {Object} Object containing refs, state, and verification handler
 */
export const useRecaptcha = () => {
  const recaptchaRef = useRef(null);
  const v2WidgetId = useRef(null);
  const [isV2Challenge, setIsV2Challenge] = useState(false);

  // Initialize reCAPTCHA v2 widget when grecaptcha is available
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        typeof window !== 'undefined' &&
        window.grecaptcha &&
        window.grecaptcha.render &&
        recaptchaRef.current
      ) {
        clearInterval(intervalId);
        if (v2WidgetId.current === null) {
          v2WidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY,
          });
          recaptchaRef.current.style.display = 'none';
        }
      }
    }, 200);
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Verify reCAPTCHA token (v3 first, then v2 if score is low)
   * @param {Function} onError Callback function to handle errors
   * @param {Function} setIsSubmitting Callback to control submit button state
   * @returns {Promise<boolean>} True if verification passed, false otherwise
   */
  const verifyRecaptcha = async (onError, setIsSubmitting) => {
    let captchaVerified = false;

    if (isV2Challenge) {
      captchaVerified = await handleRecaptchaV2(
        v2WidgetId,
        recaptchaRef,
        setIsSubmitting,
        setIsV2Challenge
      );
    } else {
      captchaVerified = await handleRecaptchaV3(
        (errs) => {
          onError(errs?.[0] || 'reCAPTCHA verification failed.');
        },
        setIsSubmitting,
        recaptchaRef,
        setIsV2Challenge
      );
    }

    return captchaVerified;
  };

  return {
    recaptchaRef,
    v2WidgetId,
    isV2Challenge,
    setIsV2Challenge,
    verifyRecaptcha,
  };
};
