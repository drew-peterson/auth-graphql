// import React, { Component } from 'react';
import React, { Component } from 'react';
import CurrentUser from '../graphql/queries/CurrentUser';
import { graphql } from 'react-apollo';

export default ComposedComponent => {
  class RequireLogin extends Component {
    componentWillUpdate({ data, history }) {
      const { user } = data;

      if (!user) {
        history.push('/');
      }
    }

    render() {
      const { data: { user } } = this.props;
      if (!user) {
        return <div />;
      }
      return user && <ComposedComponent {...this.props} />;
    }
  }

  return graphql(CurrentUser)(RequireLogin);
};
