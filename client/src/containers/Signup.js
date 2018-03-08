import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import Yup from 'yup';
import SignupMutation from '../graphql/mutations/Signup';
import CurrentUser from '../graphql/queries/CurrentUser';
import AuthForm from '../components/AuthForm';

class Signup extends Component {
  async onSubmit(
    { email, password },
    { resetForm, setSubmitting, setFieldError }
  ) {
    // resetForm(); // clear everything inform

    const { signup, history } = this.props;

    try {
      await signup({
        variables: { email, password },
        update: (proxy, { data: { signup } }) => {
          console.log('signup', signup);
          const data = proxy.readQuery({ query: CurrentUser });
          data.user = signup;
          proxy.writeQuery({ query: CurrentUser, data });
          history.push('/');
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
        render={props => (
          <AuthForm {...props} btnText="Signup" title="Signup" />
        )}
      />
    );
  }
}

export default graphql(SignupMutation, { name: 'signup' })(Signup);
