import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUser from '../graphql/queries/CurrentUser';

export default ComposedComponent => {
  class RequireLogin extends Component {
    componentWillUpdate({ data: { user }, history }) {
      if (!user) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return graphql(CurrentUser)(RequireLogin);
};
