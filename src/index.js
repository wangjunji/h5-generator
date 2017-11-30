const template = require('art-template');
const fs = require('fs-extra');
const sass = require('node-sass');
const _ = require('lodash');
const util = require('./util');
const pretty = require('pretty');
const defaultConfig = require('./config');

util.generateConfigFromImages().then((pageConfig) => {
  const config = _.assign({}, defaultConfig, { pages: pageConfig });
  console.dir(config, { depth: null, colors: true });
  fs.removeSync('src/config.json');
  fs.outputFileSync('src/config.json', JSON.stringify(config, null, 2), 'utf8');
}).catch(console.err);
