import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { spring } from 'popmotion';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueScrollmagic from './plugins/vue-scrollmagic';

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'production'
  ? 'http://cabinet.olyv.services:8888/'
  : 'http://test.cabinet.olyv.services:8888/';
window.$baseUrl = process.env.NODE_ENV === 'production'
  ? 'http://cabinet.olyv.services:8888/'
  : 'http://test.cabinet.olyv.services:8888/';
Vue.prototype.$baseChatUrl = process.env.NODE_ENV === 'production'
  ? 'http://chat.olyv.services:8888/'
  : 'http://test.chat.olyv.services:8888/';

new Vue({
  router,
  store,
  vuetify,
  spring,
  VueAwesomeSwiper,
  VueScrollmagic,
  render: (h) => h(App),
}).$mount('#app');

// eslint-disable-next-line no-unused-vars
let cordova;
// eslint-disable-next-line no-unused-vars
let FirebasePlugin;

function onDeviceReady() {
  console.log('deviceready');
  FirebasePlugin = window.FirebasePlugin;
  FirebasePlugin.getToken(
    (token) => {
      console.log(token);
    },
    (error) => console.error('Failed to get FCM token', error),
  );
  cordova = window.cordova;
}

document.addEventListener('deviceready', onDeviceReady);
