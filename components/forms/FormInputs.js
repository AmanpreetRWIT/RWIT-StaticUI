import { useEffect, useRef, useState } from 'react';

const FormInputs = ({
  type = 'text',
  name,
  label,
  required,
  onChange,
  uniqueArr,
  Required,
  options,
  CssClass = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputElement = useRef(null);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e) => {
    if (!e.target.value) setIsFocused(false);
  };

  const handleKeyPress = (event, name) => {
    // Optionally, you can prevent the default action for digits
    if (/\d/.test(event.key) && name === 'firstname') {
      event.preventDefault(); // Prevent the digit from being entered
    }
  };

  const selectOptions = Array.isArray(options)
    ? options
    : options?.split(',').map((option) => ({ Value: option }));

  return (
    <>
      <div className={`form-group ${(isFocused || selectOptions?.some(item => item?.Default)) ? 'focused' : ''} `}>
        {type == 'text' && (
          <input
            ref={inputElement}
            type={type}
            name={name}
            onChange={onChange}
            onKeyDown={(e) => {
              handleKeyPress(e, name);
            }}
            onKeyUp={(e) => {
              handleKeyPress(e, name);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required ? 'required' : ''}
            className={CssClass}
          />
        )}
        {type == 'email' && (
          <input
            ref={inputElement}
            type={type}
            name={name}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required ? 'required' : ''}
            className={CssClass}
          />
        )}
        {type == 'tel' && (
          <input
            ref={inputElement}
            type={type}
            name={name}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            pattern="^[0-9]{10}$"
            required={required ? 'required' : ''}
            className={CssClass}
          />
        )}
        {type === 'textarea' && (
          <textarea
            ref={inputElement}
            name={name}
            required={required ? 'required' : ''}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={CssClass}
          ></textarea>
        )}
        {type === 'select' && (
          <select
            ref={inputElement}
            name={name}
            required={required ? '' : ''}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            {selectOptions?.map((option, index) => (
              <option
                key={index}
                value={option?.Value}
                selected={option?.Default}
              >
                {option?.Value}
              </option>
            ))}
          </select>
        )}
        {type === 'file' && (
          <>
            <p className="file-label">Only PDF files are allowed</p>
            <input
              ref={inputElement}
              type="file"
              name={name}
              required={required ? 'required' : ''}
              onChange={onChange}
              onBlur={onBlur}
              accept=".pdf"
              id={`file-${name}`}
            />
          </>
        )}
        <label>
          {label} {Required ? <span className="red">*</span> : ''}
        </label>
        <span className="focus-border" />
      </div>
      <p className="field-err">
        {uniqueArr &&
          uniqueArr?.find((item) => {
            return item?.includes(label?.toLowerCase());
          })}
      </p>
    </>
  );
};

export default FormInputs;
