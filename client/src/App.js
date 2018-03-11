import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

// subscriptions =========================
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
// =======================================

import Nav from './components/Nav';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Login from './containers/Login';
import Signup from './containers/Signup';
import requireAuth from './containers/RequireAuth'; // HOC are lowercase because they are functions...

// subscriptions =========================
// Create an http link:
const httpLink = new HttpLink({
  uri: '/graphql', // proxy will pick this up and pass cookies
  credentials: 'same-origin' // tell apollo to use cookies...
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_URI,
  options: {
    reconnect: true
  }
});

const cache = new InMemoryCache({
  dataIdFromObject: o => o._id
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);
// =======================================

const client = new ApolloClient({
  link,
  cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={requireAuth(Dashboard)} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default App;
