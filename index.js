const server = require('./server/server');
const log = require('node-pretty-log');
const SubscriptionServer = require('subscriptions-transport-ws')
  .SubscriptionServer;
const subscribe = require('graphql').subscribe;
const execute = require('graphql').execute;

const schema = require('./server/schema/schema');

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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
