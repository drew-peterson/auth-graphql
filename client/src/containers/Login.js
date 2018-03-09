import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import Yup from 'yup';
import LoginMutation from '../graphql/mutations/Login';
import CurrentUser from '../graphql/queries/CurrentUser';
import AuthForm from '../components/AuthForm';

class Login extends Component {
  async onSubmit(
    { email, password },
    { resetForm, setSubmitting, setFieldError }
  ) {
    const { login, history } = this.props;

    try {
      await login({
        variables: { email, password },
        update: (proxy, { data: { login } }) => {
          const data = proxy.readQuery({ query: CurrentUser });
          data.user = login;
          proxy.writeQuery({ query: CurrentUser, data });
          history.push('/dashboard');
        }
      });
    } catch ({ graphQLErrors }) {
      setSubmitting(false); // enable form to submit again...
      setFieldError('form', graphQLErrors[0].message);
    }
  }

  validate() {
    return Yup.object().shape({
      email: Yup.string()
        .email('Invalid Email')
        .required('Email is required'),
      password: Yup.string()
        // .min(10, 'Password much be 10 characters')
        .required('Password is required')
    });
  }

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.onSubmit.bind(this)}
        validationSchema={this.validate} // special for Yup schema...
        render={props => <AuthForm {...props} btnText="Login" title="Login" />}
      />
    );
  }
}

export default graphql(LoginMutation, { name: 'login' })(Login);
