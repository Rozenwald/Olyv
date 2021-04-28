import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { spring } from 'popmotion';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueScrollmagic from './plugins/vue-scrollmagic';

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://test.cabinet.olyv.services:8888/'
  : 'https://cabinet.production.sopki.team:8888/';

Vue.prototype.$baseUrlNoPort = process.env.NODE_ENV === 'development'
  ? 'http://test.cabinet.olyv.services/'
  : 'https://cabinet.production.sopki.team/';

window.$baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://test.cabinet.olyv.services:8888/'
  : 'https://cabinet.production.sopki.team:8888/';

window.$baseUrlNoPort = process.env.NODE_ENV === 'development'
  ? 'http://test.cabinet.olyv.services/'
  : 'https://cabinet.production.sopki.team/';

Vue.prototype.$baseChatUrl = process.env.NODE_ENV === 'development'
  ? 'http://test.chat.olyv.services:8888/'
  : 'https://chat.production.sopki.team:8888/';

window.$baseChatUrl = process.env.NODE_ENV === 'development'
  ? 'http://test.chat.olyv.services:8888/'
  : 'https://chat.production.sopki.team:8888/';

Vue.prototype.$baseNotificationUrl = process.env.NODE_ENV === 'development'
  ? 'http://test.notification.olyv.services:8888/'
  : 'https://notification.production.sopki.team:8888/';

window.$baseNotificationUrl = process.env.NODE_ENV === 'development'
  ? 'http://test.notification.olyv.services:8888/'
  : 'https://notification.production.sopki.team:8888/';

new Vue({
  router,
  store,
  vuetify,
  spring,
  VueAwesomeSwiper,
  VueScrollmagic,
  render: (h) => h(App),
}).$mount('#app');
