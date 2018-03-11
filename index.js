// const server = require('./server/server');
// const log = require('node-pretty-log');
// const SubscriptionServer = require('subscriptions-transport-ws')
//   .SubscriptionServer;
// const subscribe = require('graphql').subscribe;
// const execute = require('graphql').execute;
//
// const schema = require('./server/schema/schema');

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
// const models = require('./models');
// const keys = require('./config/keys');

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   new SubscriptionServer(
//     {
//       execute,
//       subscribe,
//       schema
//     },
//     {
//       server,
//       path: '/subscriptions'
//     }
//   );
//   log('info', `GraphQL: http://localhost:${PORT}/graphiql`);
// });

const app = express();
// app.use(bodyParser.json());

// const MONGO_URI =
//   'mongodb://drew.peterson:peterson@ds157818.mlab.com:57818/auth-graphql';
//
// // Connect to the mongoDB instance and log a message
// // on success or failure
// mongoose.connect(MONGO_URI);
// mongoose.connection
//   .once('open', () => log('info', 'Connected to MongoLab instance.'))
//   .on('error', error => log('error', 'Error connecting to MongoLab:', error));

// use cookies inside app
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie lasts 30days in milliseconds,
    keys: ['as;0dfalsdfjkalsdf']
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT);
