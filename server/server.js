const express = require('express');
const bodyParser = require('body-parser');
const graphqlExpress = require('apollo-server-express').graphqlExpress;
const graphiqlExpress = require('apollo-server-express').graphiqlExpress;
const mongoose = require('mongoose');
const passport = require('passport');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const cookieSession = require('cookie-session');
const models = require('./models');
const passportConfig = require('./services/auth');
const schema = require('./schema/schema');

// Create a new Express application
const app = express();

const MONGO_URI =
  'mongodb://drew.peterson:peterson@ds157818.mlab.com:57818/auth-graphql';

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: 'asldjjksdfkljsdlkfjsdf',
//     store: new MongoStore({
//       url: MONGO_URI,
//       autoReconnect: true
//     })
//   })
// );

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

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  '/graphql',
  bodyParser.json(),
  // express req object needs to be manually add into graphQl with apollo-express
  // then in resolvers / mutations can access req...
  graphqlExpress(req => ({ schema, context: req }))
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assesset (main.js, main.css) files
  app.use(express.static('client/build')); // check for specific file request is looking for -- index.html will ask for main.js in client/build/static/js...
  // Express will serve up index.html if it doesn not reconize the route
  // if it does not find file inside client/build then just return index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
