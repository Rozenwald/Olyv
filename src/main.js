import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
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
new Vue({
  router,
  store,
  vuetify,
  VueAwesomeSwiper,
  VueScrollmagic,
  IosSwiper,
  render: (h) => h(App),
}).$mount('#app');
