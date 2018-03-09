import React from 'react';
import styled from 'styled-components';
import { Form } from 'formik';

import { Input } from './common';

const AuthForm = props => {
  const { title, btnText, isSubmitting, errors } = props;
  return (
    <FormWrap className="z-depth-2">
      <Title>{title}</Title>

      <Form>
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="email@test.com"
          {...props}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="password"
          {...props}
        />
        <BtnWrap>
          {errors.form && <div className="input-feedback">{errors.form}</div>}

          <button className="btn green" type="submit" disabled={isSubmitting}>
            {btnText}
          </button>
        </BtnWrap>
      </Form>
    </FormWrap>
  );
};

const Title = styled.h3`
  text-align: center;
  margin: 0;
`;

const FormWrap = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #fafafa;
`;

const BtnWrap = styled.div`
  text-align: center;
  margin-top: 15px;
`;

export default AuthForm;
