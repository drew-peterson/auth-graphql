const app = require('./server/server');
const log = require('node-pretty-log');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  log('info', `GraphQL: http://localhost:${PORT}/graphiql`);
});
