module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  devServer: {
    port: 3000,
    https: false,
  },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova',
  },
};
