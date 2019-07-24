/* eslint-disable global-require */
if (process.env.NODE_ENV === 'PRODUCTION') {
    module.exports = require('./config-prod');
} else {
    module.exports = require('./config-dev');
}
