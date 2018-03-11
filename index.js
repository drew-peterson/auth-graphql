// EXPRESS
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
// GRAPHQL
const graphqlExpress = require('apollo-server-express').graphqlExpress;
const graphiqlExpress = require('apollo-server-express').graphiqlExpress;
// SUBSCRIPTIONS
const SubscriptionServer = require('subscriptions-transport-ws')
  .SubscriptionServer;
const subscribe = require('graphql').subscribe;
const execute = require('graphql').execute;

// CONFIG
const models = require('./server/models');
const passportConfig = require('./server/services/auth');
const schema = require('./server/schema/schema');
const keys = require('./config/keys');
const log = require('node-pretty-log');

const app = express();
// app.use(bodyParser.json());

const MONGO_URI =
  'mongodb://drew.peterson:peterson@ds157818.mlab.com:57818/auth-graphql';

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => log('info', 'Connected to MongoLab instance.'))
  .on('error', error => log('error', 'Error connecting to MongoLab:', error));

// use cookies inside app
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie lasts 30days in milliseconds,
    keys: ['as;0dfalsdfjkalsdf']
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES - GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({ schema, context: req }))
);
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
    // subscriptionsEndpoint: 'ws://localhost:5000/subscriptions'
  })
);

// ROUTES - API
require('./server/routes/test')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// has to be in 1 file or safair will fail -- dunno why...
const createServer = require('http').createServer;
const server = createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: '/subscriptions'
    }
  );
  log('info', `GraphQL: http://localhost:${PORT}/graphiql`);
});
