module.exports = app => {
  app.get('/api/test', (req, res) => {
    console.log('test........');
    res.send({ msg: 'test A' });
  });
};
