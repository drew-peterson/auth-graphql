import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Auth from '../graphql/mutations/Auth';
import CurrentUser from '../graphql/queries/CurrentUser';
import AuthForm from '../components/AuthForm';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  async onSubmit({ email, password }) {
    const { login, history } = this.props;

    try {
      await login({
        variables: { email, password },
        update: (proxy, { data: { login } }) => {
          const data = proxy.readQuery({ query: CurrentUser });
          data.user = login;
          proxy.writeQuery({ query: CurrentUser, data });
          history.push('/');
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  render() {
    return (
      <AuthForm
        onSubmit={this.onSubmit.bind(this)}
        title="Login"
        btnText="Login"
      />
    );
  }
}

export default graphql(Auth, { name: 'login' })(Login);
