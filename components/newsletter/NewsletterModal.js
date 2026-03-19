import React, { useEffect, useState } from 'react';
import { isValidEmail } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import { useMobile } from '../../helpers/utilities';
import { useRecaptcha } from '../forms/hooks/useRecaptcha';

const NewsletterModal = ({ data }) => {
  const { Desc, Title, TitleColor, ButtonName, SuccessMessage, BgColor } = data;
  const router = useRouter();
  const isMobile = useMobile();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const PortalApi = process.env.NEXT_PUBLIC_SENDPORTAL_API;
  const ApiToken = process.env.NEXT_PUBLIC_SENDPORTAL_TOKEN;

  const { recaptchaRef, verifyRecaptcha } = useRecaptcha();

  useEffect(() => {
    const storedState = localStorage.getItem('popupState');
    const storedDate = localStorage.getItem('popupActivationDate');
    if (storedDate) {
      const currentDate = new Date();
      const activationDate = new Date(storedDate);
      const daysDifference = Math.floor((currentDate - activationDate) / (1000 * 60 * 60 * 24));

      if (daysDifference >= 30) {
        localStorage.setItem('popupState', 'false');
        localStorage.removeItem('popupActivationDate');
      }
    }

    if (storedState === null && !isActive) {
      localStorage.setItem('popupState', 'true');
      localStorage.setItem('popupActivationDate', new Date().toISOString());
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 200000);

      //function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    } else if (storedState === 'false') {
      localStorage.setItem('popupState', 'false');
      setIsPopupVisible(false);
    } else {
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 200000);
    }
  }, [router, isActive, isPopupVisible]);

  const handleClose = () => {
    setIsActive(false);
    setIsPopupVisible(false);
    localStorage.setItem('popupState', 'false');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const onError = (errorMsg) => {
        setError(errorMsg);
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      };

      const captchaVerified = await verifyRecaptcha(onError, setIsSubmitting);

      if (!captchaVerified) {
        return;
      }

      const subscriber = {
        email,
        first_name: '',
        last_name: '',
        tags: [10],
      };
      const response = await fetch(PortalApi, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ApiToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(subscriber),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.info('Subscriber added successfully:', data);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 10000);
      setEmail('');
    } catch (error) {
      console.error('Error adding subscriber:', error);
      setError('There was an error subscribing. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.body.scrollHeight * 0.25;

      if (scrollPosition >= threshold) {
        const storedState = localStorage.getItem('popupState');

        if (storedState === 'true') {
          setIsActive(true);
          localStorage.setItem('popupState', 'true');
          window.removeEventListener('scroll', handleScroll); // Remove listener after activation
        } else {
          localStorage.setItem('popupState', 'false');
          setIsActive(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!isMobile && (
        <div className={isActive || isPopupVisible ? 'modal-overlay' : 'modal-hide'}>
          <div id='newsletterModal' className='newsletterModal'>
            <div
              className='newsletterModal__cont container'
              style={
                BgColor.color ? { backgroundColor: BgColor.color } : { backgroundColor: '#eef0fa' }
              }
            >
              <div className='newsletterModal__wrapper'>
                <svg
                  width='52'
                  height='52'
                  viewBox='0 0 52 52'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={handleClose}
                >
                  <path
                    d='M13 13L39 39M13 39L39 13'
                    stroke='#000248'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                {Title && (
                  <div className='newsletterModal__title'>
                    <h2 style={TitleColor.color ? { color: TitleColor.color } : {}}> {Title}</h2>
                  </div>
                )}
                <div className='newsletterModal__subtitle'>
                  <p>{Desc}</p>
                </div>
                <form
                  id='modalForm'
                  style={{ position: 'relative' }}
                  className='newsletter__form'
                  onSubmit={handleSubmit}
                >
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email address'
                    required
                  />

                  <div className='form-group newsletter__btn' style={{ width: '100%' }}>
                    <button
                      type='submit'
                      className={`hoverable axil-button w-100 btn-solid ${
                        isSubmitting ? 'disable-btn' : ''
                      }`}
                      disabled={isSubmitting}
                    >
                      <span className='button-text hoverable px-0'>
                        {`${ButtonName || 'subscribe'}`}
                      </span>
                    </button>
                  </div>
                </form>
                <div
                  className='g-recaptcha recaptcha-v2-widget-newsletter'
                  ref={recaptchaRef}
                  data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY}
                  style={{ display: 'none', marginTop: '12px' }}
                ></div>
              </div>
              {showError && <p className='error-message'>{showError ? error : ''}</p>}
              {success && (
                <p className='success-message'>
                  {SuccessMessage || 'Thank you for signing up our newsletter.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterModal;
