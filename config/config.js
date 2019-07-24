const pConf = require('./config-prod');
const dConf = require('./config-dev');

if (process.env.NODE_ENV === 'production') {
    module.exports = pConf;
} else {
    module.exports = dConf;
}
