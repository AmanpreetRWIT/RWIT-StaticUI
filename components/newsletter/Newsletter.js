import React, { useState } from 'react';
import { isValidEmail } from '../../helpers/utilities';

const Newsletter = ({ data }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const PortalApi = process.env.NEXT_PUBLIC_SENDPORTAL_API;
  const ApiToken = process.env.NEXT_PUBLIC_SENDPORTAL_TOKEN;

  const handleSubmitn = async (event) => {
    event.preventDefault();
    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const subscriber = {
        email,
        first_name: '',
        last_name: '',
        tags: [9],
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

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      console.info('Subscriber added successfully:', result);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 10000);
      setEmail('');
    } catch (error) {
      console.error('Error adding subscriber:', error);
      setError('There was an error subscribing. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter">
      <div
        className="newsletter__cont container"
        style={{
          backgroundColor: data?.BgColor || '#eef0fa',
          border: `1px solid ${data?.BorderColor || '#ccc'}`,
        }}
      >
        <div
          className="newsletter__wrapper"
          style={{
            justifyContent: !data?.Title ? 'center' : 'space-between',
          }}
        >
          {data?.Title && (
            <div className="newsletter__title">
              <h2
                className="custom-color"
                style={{ color: data?.TitleColor || '#000' }}
              >
                {data.Title}
              </h2>
            </div>
          )}

          <form className="newsletter__form" onSubmit={handleSubmitn}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />

            <div className="form-group newsletter__btn">
              <button
                type="submit"
                className={`hoverable axil-button w-100 btn-solid ${
                  isSubmitting ? 'disable-btn' : ''
                }`}
                disabled={isSubmitting}
              >
                <span className="button-text hoverable px-0">
                  {data?.ButtonName || 'subscribe'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {showError && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            {data?.SuccessMessage || 'Thank you for signing up our newsletter.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
