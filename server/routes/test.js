module.exports = app => {
  app.get('/api/test', (req, res) => {
    console.log('test........', req.user);
    res.send({ msg: 'test A' });
  });
};
