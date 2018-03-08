const log = require('node-pretty-log');
module.exports = app => {
  app.get('/api/test', (req, res) => {
    log('info', req.user);

    res.send({ msg: 'test A' });
  });
};
