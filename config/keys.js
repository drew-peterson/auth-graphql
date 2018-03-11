if (process.env.NODE_ENV === 'production') {
  // we are in production
  module.exports = require('./prod');
} else {
  // return dev keys
  module.exports = require('./dev'); // pull in dev keys and export them
}
