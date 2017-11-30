const template = require('art-template');
const fs = require('fs-extra');
const sass = require('node-sass');
const _ = require('lodash');
const util = require('./util');
const pretty = require('pretty');
const config = require('./config.json');


const pages = config.pages;
const dependencies = config.dependencies;
const music = config.music;
const wechat = config.wechat;
const loader = config.loader;
const html = template(`${__dirname}/template/index.art`, {loader, pages, music, wechat,title: config.title, designWidth: config.meta.designWidth, dependencies });


_.forOwn(dependencies, (dependency, name) => {
  if (name.endsWith('css')) {
    fs.copy(dependency.path, `dist/style/vendor/${name}`).catch(console.err);
  } else if (name.endsWith('js')) {
    fs.copy(dependency.path, `dist/scripts/vendor/${name}`).catch(console.err);
  }
});

fs.outputFile('dist/index.html', pretty(html, { ocd: true })).catch(console.err);

const elemSassExpressions = [];

_.forEach(pages, (page) => {
  // generate backgound image for each slide
  elemSassExpressions.push(`#slide-${page.id}{background:url(${page.background.image}) no-repeat;background-size:cover}`);
  _.forEach(page.elements, (elem) => {
    // generate style for each element
    const elemId = `slide-${page.id}-${elem.id}`;
    const sassTmpl = `#${elemId}{
      @include h5-element('${elem.image.url}',
      ${elem.image.width},
      ${elem.image.height},
      ${elem.image.top ? elem.image.top : null},
      ${elem.image.bottom ? elem.image.bottom : null},
      ${elem.image.left ? elem.image.left : null},
      ${elem.image.right ? elem.image.right : null},
      ${elem.image.zIndex ? elem.image.zIndex : null})},
      `;
    elemSassExpressions.push(sassTmpl);
  });
});

if (music) {
  let musicPositionSass = '';
  switch(music.control.position) {
    case 'topLeft':
      musicPositionSass = `top:px2rem(${music.control.offset});left:px2rem(${music.control.offset});`;
      break;
    case 'topRight':
      musicPositionSass = `top:px2rem(${music.control.offset});right:px2rem(${music.control.offset});`;
      break;
    case 'bottomLeft':
      musicPositionSass = `bottom:px2rem(${music.control.offset});left:px2rem(${music.control.offset});`;
      break;
    case 'bottomRight':
      musicPositionSass = `bottom:px2rem(${music.control.offset});right:px2rem(${music.control.offset});`;
      break;
    default:
      musicPositionSass = `top:px2rem(${music.control.offset});right:px2rem(${music.control.offset});`;
  }
  const musicSassTmpl = `#audio-btn{
    position: fixed;
    width: px2rem(${music.control.icon.width});
    height: px2rem(${music.control.icon.height});
    ${musicPositionSass}
    background: url('${music.control.icon.url}') no-repeat;
    background-size:cover;
    opacity: ${music.control.opacity};
    z-index: ${music.control.zIndex};
  }`;
  const loaderSassTmpl = `.loading-wrapper{
    background: ${loader.backgroundColor}${loader.backgroundImage?`url('${loader.backgroundImage}) no-repeat`:''};
  }`;
  elemSassExpressions.push(musicSassTmpl);
  elemSassExpressions.push(loaderSassTmpl);
}

fs.copy('src/img', 'dist/img').catch(console.err);
fs.copy('src/scripts', 'dist/scripts').catch(console.err);
fs.copy('src/presets', 'dist/presets').catch(console.err);
fs.copy('src/music', 'dist/music').catch(console.err);

fs.copy('src/style', '.tmp/style')
  .then(() => fs.outputFile('.tmp/style/_auto.scss', elemSassExpressions.join('\n')))
  .then(() => {
    sass.render({
      file: '.tmp/style/main.scss',
      outputStyle: 'nested',
    }, (err, result) => fs.outputFile('dist/style/h5.css', result.css).then(() => fs.remove('.tmp/')));
  })
  .catch(console.err);
