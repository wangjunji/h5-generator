const customConfig = require('./custom');
const defaultConfig = require('./default');
const _ = require('lodash');

module.exports = _.merge({}, defaultConfig, customConfig);
