const glob = require('glob');
const _ = require('lodash');
const imageSize = require('image-size');
const config = require('../config');

module.exports = {
  generateConfigFromImages() {
    return new Promise((resolve, reject) => {
      glob('**/*.+(png|jpg|jpeg|gif)', { cwd: 'src/img' }, (err, files) => {
        if (err) {
          return reject(err);
        }
        const elementConfigs = [];
        _.forEach(files, (filename) => {
          const pageId = filename.split('/')[0];
          const elementMatch = new RegExp(`(\\w+)(@${config.meta.designDeviceRatio})x?\\.(png|jpg|jpeg|gif)$`).exec(filename.split('/')[1]);
          if (elementMatch) {
            const elementId = elementMatch[1];
            const dimensions = imageSize(`src/img/${filename}`);
            const elementConfig = {
              pageId,
              elementId,
              type: 'image',
              image: {
                url: `../img/${filename.replace(/@[12]x/g, '')}`,
                width: dimensions.width,
                height: dimensions.height,
                top: 0,
                left: 0,
              },
              animation: {
                in: {
                  animationClassName: 'fadeIn',
                  delay: 500,
                  duration: 1000,
                  timingFunction: 'linear',
                },
              },
            };
            elementConfigs.push(elementConfig);
          }
        });
        const exportConfig = _(elementConfigs)
          .groupBy(x => x.pageId)
          .map((value, key) => ({
            id: key,
            background: {
              image: `../img/${value[0].pageId}/bg.jpg`,
            },
            elements: _.map(value, (item) => {
              item.id = item.elementId;
              delete item.elementId;
              delete item.pageId;
              return item;
            }),
          }))
          .value();
        return resolve(exportConfig);
      });
    });
  },
};
