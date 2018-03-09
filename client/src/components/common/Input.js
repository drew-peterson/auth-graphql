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
          errors[name] && touched[name] ? 'input-field error' : 'input-field'
        }
      />
      {errors[name] &&
        touched[name] && <div className="text-input error">{errors[name]}</div>}
    </div>
  );
};

export { Input };
