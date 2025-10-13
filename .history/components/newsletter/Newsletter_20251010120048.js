import React, { useState } from 'react';
import { isValidEmail } from '../../helpers/utilities';

const Newsletter = ({
  BgColor = { color: '#eef0fa' },
  BorderColor = { color: '#d1d5db' },
  Title = '',
  TitleColor = { color: '#222' },
  ButtonName = 'Subscribe',
  SuccessMessage = 'Thank you for signing up for our newsletter.'
}) => {
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
      setTimeout(() => {
        setShowError(false);
      }, 5000);
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
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter">
      <div
        className="newsletter__cont container"
        style={{
          backgroundColor: BgColor.color,
          border: `1px solid ${BorderColor.color}`
        }}
      >
        <div
          className="newsletter__wrapper"
          style={!Title ? { justifyContent: 'center' } : { justifyContent: 'space-between' }}
        >
          {Title && (
            <div className="newsletter__title">
              <h2
                className="custom-color"
                style={TitleColor.color ? { color: TitleColor.color } : {}}
              >
                {Title}
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
                className={`hoverable axil-button w-100 btn-solid ${isSubmitting ? 'disable-btn' : ''} ${ButtonName}`}
                disabled={isSubmitting}
              >
                <span className="button-text hoverable px-0">
                  {ButtonName || 'subscribe'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {showError && <p className="error-message">{showError ? error : ''}</p>}
        {success && (
          <p className="success-message">
            {SuccessMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
