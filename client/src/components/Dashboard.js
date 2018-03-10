import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import CurrentUser from '../graphql/queries/CurrentUser';
import onNameChange from '../graphql/subscriptions/onNameChange';
import UpdateName from '../graphql/mutations/UpdateName';

import styled from 'styled-components';

class Dashboard extends Component {
  state = {
    name: ''
  };

  componentWillUpdate({ data: { user, subscribeToMore } }) {
    if (user) {
      subscribeToMore({
        document: onNameChange,
        variables: {
          userID: user._id
        },
        updateQuery: (prev, { subscriptionData }) => {
          const { data: { onNameChange } } = subscriptionData;
          if (!onNameChange) {
            return prev;
          }

          // will not update local because cache is already updated
          // just like redux return new state...
          return { ...prev, user: onNameChange };
        }
      });
    }
  }

  updateName(e) {
    e.preventDefault();
    const { updateName, data: { user } } = this.props;

    updateName({
      variables: {
        name: this.state.name
      },
      // does not need update because the user object is changing
      // optimistic is faster and doesnt wait for ajax
      // update could also be used here if not an object
      optimisticResponse: {
        __typename: 'Mutation',
        updateName: {
          ...user,
          name: 'TEMP NAME!!!'
        }
      }
    });
  }

  render() {
    const { data } = this.props;
    const { user } = data;
    // console.log('this.props', this.props);

    return (
      <div>
        <h2>Dashboard</h2>

        {user && (
          <h5>
            welcome back:{' '}
            <Name>
              {user.name} - {user.email}
            </Name>
          </h5>
        )}

        <form
          onSubmit={this.updateName.bind(this)}
          style={{ padding: '40px', maxWidth: '300px' }}
        >
          <input
            type="text"
            value={this.state.name}
            placeholder="new name..."
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button className="btn" type="submit">
            update name
          </button>
        </form>
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
