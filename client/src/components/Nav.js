import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import CurrentUser from '../graphql/queries/CurrentUser';

class Nav extends Component {
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
      <Link key="1" to="/logout">
        Logout
      </Link>
    ];
  }

  render() {
    return (
      <Header>
        <p>logo</p>
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

export default graphql(CurrentUser)(Nav);
// export default Nav;
