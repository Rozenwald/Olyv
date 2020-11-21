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
  ? 'http://test.cabinet.olyv.services:8888/'
  : 'http://test.cabinet.olyv.services:8888/';

Vue.prototype.$baseUrlNoPort = process.env.NODE_ENV === 'production'
  ? 'http://test.cabinet.olyv.services/'
  : 'http://test.cabinet.olyv.services/';

window.$baseUrl = process.env.NODE_ENV === 'production'
  ? 'http://test.cabinet.olyv.services:8888/'
  : 'http://test.cabinet.olyv.services:8888/';

Vue.prototype.$baseChatUrl = process.env.NODE_ENV === 'production'
  ? 'http://test.chat.olyv.services:8888/'
  : 'http://test.chat.olyv.services:8888/';

window.$baseChatUrl = process.env.NODE_ENV === 'production'
  ? 'http://test.chat.olyv.services:8888/'
  : 'http://test.chat.olyv.services:8888/';

Vue.prototype.$baseNotificationUrl = process.env.NODE_ENV === 'production'
  ? 'http://test.notification.olyv.services:8888/'
  : 'http://test.notification.olyv.services:8888/';

window.$baseNotificationUrl = process.env.NODE_ENV === 'production'
  ? 'http://test.notification.olyv.services:8888/'
  : 'http://test.notification.olyv.services:8888/';

new Vue({
  router,
  store,
  vuetify,
  spring,
  VueAwesomeSwiper,
  VueScrollmagic,
  render: (h) => h(App),
}).$mount('#app');
