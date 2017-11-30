// const gm = require('gm').subClass({imageMagick: true});

// gm().command('compare').in('-subimage-search', '-metric', 'MSE', './src/test/design.png', './src/img/01/title@2x.png')
//   .write('./src/test/diff.png', (err, stdout, stderr) => {
//     console.log(stdout);
//     console.log(stderr);
//   });
const PSD = require('psd');
const _ = require('lodash');
PSD.open('./src/test/test.psd').then((psd) => {
  const groups = psd.tree().export().children;
  _.forEach(groups, (group) => {
    console.log(group);
  });
});
