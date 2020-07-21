import Vue from 'vue';
import Vuex from 'vuex';
import bottomNavigation from './modules/bottomNavigaion';
import appbar from './modules/appbar';
import setting from './modules/setting';
import loginDialog from './modules/loginDialog';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    bottomNavigation,
    appbar,
    setting,
    loginDialog,
    user,
  },
});
