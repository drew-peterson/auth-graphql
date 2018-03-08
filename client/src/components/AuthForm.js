import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Auth from '../graphql/mutations/Auth';
import CurrentUser from '../graphql/queries/CurrentUser';

class AuthForm extends Component {
  async login(values) {
    const { login } = this.props;

    try {
      await login({
        variables: { email: 'test@test.com', password: 'test' },
        update: (proxy, { data: { login } }) => {
          const data = proxy.readQuery({ query: CurrentUser });
          data.user = login;
          proxy.writeQuery({ query: CurrentUser, data });
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  render() {
    return (
      <div>
        <h2>auth form</h2>
        <button onClick={this.login.bind(this)}>login</button>
      </div>
    );
  }
}

export default graphql(Auth, { name: 'login' })(AuthForm);
