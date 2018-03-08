import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Nav from './components/Nav';
import Landing from './components/Landing';
import Login from './containers/Login';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql', // proxy will pick this up and pass cookies
    credentials: 'same-origin' // tell apollo to use cookies...
  }),
  cache: new InMemoryCache({
    dataIdFromObject: o => o._id
  })
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Nav />
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
