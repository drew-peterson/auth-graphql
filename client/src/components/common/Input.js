import React from 'react';

const Input = ({
  values,
  handleBlur,
  handleChange,
  errors,
  touched,
  name,
  placeholder,
  type,
  label
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors[name] && touched[name] ? 'text-input error' : 'text-input'
        }
      />
      {errors[name] &&
        touched[name] && <div className="input-feedback">{errors[name]}</div>}
    </div>
  );
};

export { Input };
