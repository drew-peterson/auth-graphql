import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import CurrentUser from '../graphql/queries/CurrentUser';
import nameChanged from '../graphql/subscriptions/nameChanged';
import UpdateName from '../graphql/mutations/UpdateName';

import styled from 'styled-components';

class Dashboard extends Component {
  // componentWillMount() {
  //   const { data: { subscribeToMore } } = this.props;
  //
  //   subscribeToMore({
  //     document: nameChanged,
  //     updateQuery: (previousResult, { subscriptionData, variables }) => {
  //       console.log('updateQuery', subscriptionData, variables);
  //       // Perform updates on previousResult with subscriptionData
  //       // return updatedResult;
  //     }
  //   });
  // }

  updateName() {
    const { updateName } = this.props;

    updateName({
      variables: {
        name: 'DREW 2'
      }
    });
  }

  render() {
    const { data } = this.props;
    const { user } = data;
    console.log('data', data);

    return (
      <div>
        <h2>Dashboard</h2>

        {user && (
          <h5>
            welcome back: <Name>{user.name}</Name>
          </h5>
        )}

        <button className="btn" onClick={this.updateName.bind(this)}>
          update name
        </button>
      </div>
    );
  }
}

const Name = styled.span`
  color: blue;
  font-size: 20px;
  font-weight: bold;
`;

export default compose(
  graphql(CurrentUser),
  graphql(UpdateName, { name: 'updateName' })
)(Dashboard);
