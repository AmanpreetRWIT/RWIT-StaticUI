import Router from 'next/router';

export const handleGtagUserData = (email, firstName) => {
  if (typeof window === 'undefined' || !email || !firstName) {
    console.info('Gtag conditions failed:', {
      hasWindow: typeof window !== 'undefined',
      hasEmail: !!email,
      hasFirstName: !!firstName,
    });
    return;
  }

  if (window.gtag) {
    window.gtag('set', 'user_data', {
      email: email,
      first_name: firstName,
    });
  } else {
    console.info('Gtag not available, skipping user data setting');
  }
};

export const handleSubscriber = async (payloadData, formData, PortalApi, ApiToken) => {
  try {
    const subscriberdata = {
      email: payloadData?.email,
      first_name: payloadData?.firstname,
      tags: [`${formData?.FormName === 'Contact-form' ? 7 : 8}`],
    };

    const response = await fetch(PortalApi, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ApiToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(subscriberdata),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    await response.json();
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw error;
  }
};

export const submitApplyForm = async ({
  payloadData,
  path,
  careerData,
  formReset,
  setIsPopupVisible,
  setIsActive,
  setApplySuccess,
}) => {
  const SUCCESS_MESSAGE_TIMEOUT = 5000;

  const formBody = new FormData();
  const Position = careerData?.data?.find((career) => path === '/' + career?.full_slug)?.content
    ?.CareerHeading;

  Object.entries(payloadData).forEach(([key, value]) => {
    formBody.append(key, value);
  });
  formBody.append('Position', Position);

  const response = await fetch('/api/send-email', {
    method: 'POST',
    body: formBody,
  });

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  if (setApplySuccess) {
    setApplySuccess(true);

    setTimeout(() => {
      setApplySuccess(false);
      formReset();
    }, SUCCESS_MESSAGE_TIMEOUT);
  }
  if (setIsPopupVisible) setIsPopupVisible(true);
  if (setIsActive) setIsActive(true);
};

export const submitHubspotForm = async ({
  hubspotPortalId,
  formData,
  payloadData,
  formReset,
  setIsPopupVisible,
  CaseStudyPopup,
  handleCasestudyPopup,
  setIsActive,
}) => {
  const URL = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${formData?.FormType}`;

  const payload = {
    fields: Object.entries(payloadData).map(([key, value]) => ({
      name: key,
      value,
    })),
  };

  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  Router.push('/thank-you');
  setTimeout(formReset, 4000);

  if (setIsPopupVisible) setIsPopupVisible(false);
  if (CaseStudyPopup) handleCasestudyPopup();
  if (setIsActive) setIsActive(false);
};
