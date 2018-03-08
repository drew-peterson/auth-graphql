import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import CurrentUser from '../graphql/queries/CurrentUser';
import Logout from '../graphql/mutations/Logout';

class Nav extends Component {
  logout() {
    const { logout } = this.props;
    logout({
      variables: {},
      update: (proxy, { data: { logout } }) => {
        const data = proxy.readQuery({ query: CurrentUser });
        data.user = null;
        proxy.writeQuery({ query: CurrentUser, data });
      }
    });
  }

  authCheck() {
    const { user, loading } = this.props.data;
    console.log('user', user);

    if (loading) {
      return <div />;
    }

    if (!user) {
      return [
        <Link key="1" to="/login">
          Login
        </Link>,
        <Link key="2" to="/signup">
          Signup
        </Link>
      ];
    }
    return [
      <a key="1" href="javascript:void(0)" onClick={this.logout.bind(this)}>
        logout
      </a>
    ];
  }

  render() {
    return (
      <Header>
        <Link to="/">Home</Link>
        <NavWrap>{this.authCheck()}</NavWrap>
      </Header>
    );
  }
}

const Header = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const NavWrap = styled.div`
  display: flex;

  a {
    margin-left: 15px;
  }
`;

export default compose(
  graphql(CurrentUser),
  graphql(Logout, { name: 'logout' })
)(Nav);
// export default Nav;
