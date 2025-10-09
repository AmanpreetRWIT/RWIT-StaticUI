import React, { useRef, useState, useEffect } from 'react';
import FormInputs from "../../components/forms/FormInputs";
import Router from 'next/router';
import { isValidEmail } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
//import careerData from '../../public/careerData.json';

const ContactForm = ({
  formName = 'Contact-form',
  formType = 'default-form',
  inputs = [],
  submitButton = 'Submit',
  submitButtonClass = '',
  setIsPopupVisible,
  setIsActive,
  caseStudyPopup,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const form = useRef();
  const [formDatas, setFormDatas] = useState({});
  const [fieldErrors, setFieldErrors] = useState([]);
  const uniqueArr = [...new Set(fieldErrors)];
  const router = useRouter();
  const [utmValues, setUtmValues] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_id: '',
  });
  const path = usePathname();

  function containsNumber(str) {
    return /\d/.test(str);
  }

  const PortalApi = process.env.NEXT_PUBLIC_SENDPORTAL_API;
  const ApiToken = process.env.NEXT_PUBLIC_SENDPORTAL_TOKEN;

  useEffect(() => {
    const utmData = JSON.parse(sessionStorage.getItem('utm_values'));
    setUtmValues((prev) => ({
      ...prev,
      ...utmData,
      utm_source: utmData?.utm_source
        ? utmData?.utm_source
        : window.location.href,
    }));
  }, [router]);

  useEffect(() => {
    inputs?.forEach((field) => {
      if (field?.Type === 'select' && field?.Select?.some((val) => val?.Default)) {
        setFormDatas((prev) => ({
          ...prev,
          [field.Name]: field?.Select?.filter((val) => val?.Default)[0]?.Default,
        }));
      }
    });
  }, [inputs]);

  const payloadData = { ...utmValues, ...formDatas };

  const handleCasestudyPopup = () => {
    localStorage.setItem('popupState2', 'false');
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      setFormDatas({ ...formDatas, [name]: event.target.files[0] });
    } else {
      setFormDatas({ ...formDatas, [name]: value });
    }
  };

  const validateForm = () => {
    let errors = {};
    fieldErrors.length = 0; // clear old errors
    inputs?.forEach((field) => {
      const value = formDatas[field.Name] || '';
      if (field.Required) {
        if (field.Type !== 'file' && value.trim() === '') {
          fieldErrors.push(`Please enter your ${field.Label.toLowerCase()}`);
        } else if (field.Type === 'file') {
          if (value && value.type !== 'application/pdf') {
            fieldErrors.push(
              `Please upload a PDF for ${field.Label.toLowerCase()}`
            );
          } else if (value && value.size > 4194304) {
            fieldErrors.push(
              `File size exceeds the maximum limit of 4MB for ${field.Label.toLowerCase()}`
            );
          } else if (!value) {
            fieldErrors.push(
              `Please upload a file for ${field.Label.toLowerCase()}`
            );
          }
        }
      }
      if (field.Label === 'Name' && containsNumber(value)) {
        fieldErrors.push(`Please enter a valid name using only letters.`);
      }
      if (field.Label === 'Full Name' && containsNumber(value)) {
        fieldErrors.push(`Please enter valid full name using only letters.`);
      }
      if (field.Type === 'email' && !isValidEmail(value)) {
        fieldErrors.push(`Please enter a valid ${field.Label.toLowerCase()}`);
      }
    });
    setErrors(errors);
    return fieldErrors.length === 0;
  };

  // function determineEnvironment() {
  //   return process.env.STORYBLOK_IS_PRODUCTION;
  // }
  // const isProduction = determineEnvironment();
  // const hubspotPortalId =
  //   isProduction === '"true"' || isProduction === 'true'
  //     ? '5894721'
  //     : '48042010';

  // GA User Data
  const handleGtagUserData = (email, firstName) => {
    if (typeof window === 'undefined' || !email || !firstName) return;

    if (window.gtag) {
      window.gtag('set', 'user_data', {
        email: email,
        first_name: firstName,
      });
    }
  };

  const handleSubscriber = async () => {
    try {
      const subscriberdata = {
        email: payloadData?.email,
        first_name: payloadData?.firstname,
        tags: [`${formName === 'Contact-form' ? 7 : 8}`],
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
      console.info('Subscriber added successfully');
    } catch (error) {
      console.error('Error adding subscriber:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    const isValid = validateForm();
    if (!isValid) {
      setIsDisabled(false);
      setTimeout(() => setFieldErrors([]), 4000);
      return;
    }
    try {
      if (typeof grecaptcha !== 'undefined') {
        await grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: 'submit' }
        );
      }
      if (formType === 'apply-form') {
        const formBody = new FormData();
        const Position = careerData?.data?.find(
          (career) => path === '/' + career?.full_slug
        )?.content?.CareerHeading;
        Object.entries(payloadData).forEach(([key, value]) => {
          formBody.append(key, value);
        });
        formBody.append('Position', Position);
        const response = await fetch('/api/send-email', {
          method: 'POST',
          body: formBody,
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // GA + Subscriber
        handleGtagUserData(payloadData?.email, payloadData?.firstname);
        handleSubscriber();

        Router.push('/thank-you');
        setTimeout(() => {
          e.target.reset();
          setFormDatas({});
        }, 4000);
        if (setIsPopupVisible) setIsPopupVisible(false);
        if (setIsActive) setIsActive(false);
      } else {
        const URL = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${formType}`;
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

        handleGtagUserData(payloadData?.email, payloadData?.firstname);
        handleSubscriber();

        Router.push('/thank-you');
        setTimeout(() => {
          e.target.reset();
          setFormDatas({});
        }, 4000);
        if (setIsPopupVisible) setIsPopupVisible(false);
        if (caseStudyPopup) handleCasestudyPopup();
        if (setIsActive) setIsActive(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setIsDisabled(false);
    }
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      name={formName}
      encType="multipart/form-data"
    >
      {inputs?.length > 0 && (
        <div className="form-group">
          {inputs.map((data, index) => (
            <div key={index}>
              <FormInputs
                name={data?.name}
                label={data?.label}
                type={data?.type}
                onChange={handleChange}
                uniqueArr={uniqueArr}
                Required={data?.required}
                options={data?.Select}
                CssClass={data?.CssClass}
              />
            </div>
          ))}
        </div>
      )}
      {submitButton && (
        <div className="form-group form-btn">
          <button
            id="FormButton"
            className={`hoverable axil-button btn-large btn-transparent w-100 ${submitButtonClass}`}
            disabled={isDisabled}
          >
            <span className="button-text">{submitButton}</span>
            {isDisabled && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
