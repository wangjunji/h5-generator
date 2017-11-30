const dependencies = require('./dependency');

module.exports = {
  title: 'H5 generator',
  meta: {
    designWidth: 750,
    designHeight: 1250,
    designDeviceRatio: 2,
  },
  music: {
    control: {
      icon: {
        url: '../presets/img/audio.png',
        width: 60,
        height: 60,
      },
      position: 'topRight',
      offset: 20,
      opacity: 0.8,
      zIndex: 9999,
    },
    preload: true,
    autoPlay: true,
    loop: true,
    source: '',
  },
  wechat: null,
  loader: {
    backgroundColor:'#fff',
    animateType:'jump',
    iconPath:'./presets/img/loader.png',
    progressBar:true,
    progressBarSetting:{
      labelColor:'#666',
      strokeWidth:6,
      strokeColor:'#999',
    },
    preloadResources:true
  },
  dependencies,
};
