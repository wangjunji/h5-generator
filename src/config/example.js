const dependencies = require('./dependency');

module.exports = {
  title: 'title',
  meta: {
    designWidth: 750,
    designHeight: 1250,
    designDeviceRatio: 2,
  },
  pages: [{
    id: 1,
    background: {
      image: './img/bg.jpg',
      color: '#f8f8f8',
    },
    elements: [{
      id: 'title',
      type: 'image',
      image: {
        url: './img/title.png',
        width: 200,
        height: 100,
        auto: false,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      animation: {
        in: {
          animationClassName: 'fadeIn',
          delay: 1000,
          duration: 2000,
          timingFunction: 'linear',
        },
        out: {
          animationClassName: 'fadeOut',
          delay: 1000,
          duration: 2000,
          timingFunction: 'linear',
        },
      },
    }, {
      id: 'text1',
      type: 'image',
      image: {
        url: './img/text1.png',
        width: 400,
        height: 300,
        auto: false,
        top: 320,
        left: 100,
        right: 0,
        bottom: 0,
      },
      animation: {
        in: {
          animationClassName: 'fadeIn',
          delay: 1000,
          duration: 2000,
          timingFunction: 'linear',
        },
        out: {
          animationClassName: 'fadeOut',
          delay: 1000,
          duration: 2000,
          timingFunction: 'linear',
        },
      },
    }],
  }],
  music: {
    control: {
      icon: {
        path: './img/music.png',
        width: 60,
        height: 60,
      },
      position: 'topRight',
    },
    autoPlay: true,
    loop: true,
    source: './music/demo.mp3',
  },
  dependencies,
};
