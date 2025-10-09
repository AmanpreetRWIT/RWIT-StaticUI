import { useRef, useState } from "react";

const FormInputs = ({
  type = "text",
  name,
  label,
  required = false,
  Required = false,
  CssClass = "",
  options = [],
  uniqueArr = [],
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (!e.target.value) setIsFocused(false);
  };

  // Prevent digits in firstname field
  const handleKeyPress = (event) => {
    if (/\d/.test(event.key) && name === "firstname") {
      event.preventDefault();
    }
  };

  // Handle select options (supports both array & comma-separated string)
  const selectOptions = Array.isArray(options)
    ? options
    : options?.split(",").map((opt) => ({ Value: opt }));

  return (
    <>
      <div
        className={`form-group ${
          isFocused || selectOptions?.some((item) => item?.Default)
            ? "focused"
            : ""
        }`}
      >
        {/* TEXT INPUT */}
        {type === "text" && (
          <input
            ref={inputRef}
            type="text"
            name={name}
            required={required}
            className={CssClass}
            onChange={onChange}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}

        {/* EMAIL INPUT */}
        {type === "email" && (
          <input
            ref={inputRef}
            type="email"
            name={name}
            required={required}
            className={CssClass}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}

        {/* PHONE INPUT */}
        {type === "tel" && (
          <input
            ref={inputRef}
            type="tel"
            name={name}
            required={required}
            pattern="^[0-9]{10}$"
            className={CssClass}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}

        {/* TEXTAREA */}
        {type === "textarea" && (
          <textarea
            ref={inputRef}
            name={name}
            required={required}
            className={CssClass}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></textarea>
        )}

        {/* SELECT DROPDOWN */}
        {type === "select" && (
          <select
            ref={inputRef}
            name={name}
            required={required}
            className={CssClass}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
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

        {/* FILE INPUT */}
        {type === "file" && (
          <>
            <p className="file-label">Only PDF files are allowed</p>
            <input
              ref={inputRef}
              type="file"
              name={name}
              required={required}
              className={CssClass}
              accept=".pdf"
              id={`file-${name}`}
              onChange={onChange}
              onBlur={handleBlur}
            />
          </>
        )}

        {/* LABEL */}
        <label>
          {label} {Required && <span className="red">*</span>}
        </label>

        <span className="focus-border" />
      </div>

      {/* ERROR MESSAGE (IF ANY) */}
      <p className="field-err">
        {uniqueArr?.find((item) => item?.includes(label?.toLowerCase()))}
      </p>
    </>
  );
};

export default FormInputs;
