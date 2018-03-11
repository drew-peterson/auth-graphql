const express = require('express');
const bodyParser = require('body-parser');
const graphqlExpress = require('apollo-server-express').graphqlExpress;
const graphiqlExpress = require('apollo-server-express').graphiqlExpress;
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session'); //better
const models = require('./models');
const passportConfig = require('./services/auth');
const schema = require('./schema/schema');
const log = require('node-pretty-log');

// subscriptions
const createServer = require('http').createServer;

// Create a new Express application
const app = express();

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

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// require in ALL EXPRESS ROUTES....
require('./routes/test')(app);

// express req object needs to be manually add into graphQl with apollo-express
// then in resolvers / mutations can access req...
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

module.exports = createServer(app);
