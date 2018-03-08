import React, { Component } from 'react';
import styled from 'styled-components';

class AuthForm extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    onSubmit({ email, password });
  }

  render() {
    const { email, password } = this.state;
    const { title, btnText } = this.props;
    return (
      <FormWrap className="z-depth-2">
        <Title>{title}</Title>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <BtnWrap>
            <button type="submit" className="btn">
              {btnText}
            </button>
          </BtnWrap>
        </form>
      </FormWrap>
    );
  }
}

const Title = styled.h2`
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
`;

export default AuthForm;
