import { RECAPTCHA_CONFIG } from '../../../constants/recaptcha';

export const handleRecaptchaV2 = async (
  v2WidgetId,
  recaptchaRef,
  setIsDisabled,
  setIsV2Challenge
) => {
  const v2Response = window.grecaptcha.getResponse(v2WidgetId.current);
  if (!v2Response) {
    setIsDisabled(false);
    return false;
  }

  window.grecaptcha.reset(v2WidgetId.current);
  recaptchaRef.current.style.display = 'none';
  setIsV2Challenge(false);
  return true;
};

export const handleRecaptchaV3 = async (
  setFieldErrors,
  setIsDisabled,
  recaptchaRef,
  setIsV2Challenge
) => {
  if (typeof grecaptcha === 'undefined' || !grecaptcha.execute) {
    return false;
  }

  const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
    action: 'submit',
  });

  const verifyResponse = await fetch('/api/verify-recaptcha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  const verification = await verifyResponse.json();
  const recaptchaScore = verification.score;
  if (!verification.success) {
    setFieldErrors(['reCAPTCHA verification failed. Please try again.']);
    setIsDisabled(false);
    return false;
  }

  if (verification.score <= RECAPTCHA_CONFIG.SCORE_THRESHOLD) {
    if (recaptchaRef.current) recaptchaRef.current.style.display = 'block';
    setIsDisabled(false);
    setIsV2Challenge(true);
    return false;
  }

  return true;
};
