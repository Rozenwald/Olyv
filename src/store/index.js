import Vue from 'vue';
import Vuex from 'vuex';
import bottomShit from './modules/bottomShit';
import bottomNavigation from './modules/bottomNavigaion';
import appbar from './modules/appbar';
import setting from './modules/setting';
import comment from './modules/comment';
import loginDialog from './modules/loginDialog';
import userDataDialog from './modules/userDataDialog';
import user from './modules/user';
import myOrder from './modules/myOrder';
import repeatLoginDialog from './modules/repeatLoginDialog';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    bottomShit,
    bottomNavigation,
    appbar,
    setting,
    loginDialog,
    userDataDialog,
    user,
    myOrder,
    comment,
    repeatLoginDialog,
  },
});
