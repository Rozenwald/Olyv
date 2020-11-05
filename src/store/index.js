import Vue from 'vue';
import Vuex from 'vuex';
import bottomSheet from './modules/bottomSheet';
import bottomNavigation from './modules/bottomNavigaion';
import appbar from './modules/appbar';
import setting from './modules/setting';
import comment from './modules/comment';
import loginDialog from './modules/loginDialog';
import errorDialog from './modules/errorDialog';
import userDataDialog from './modules/userDataDialog';
import user from './modules/user';
import chat from './modules/chat';
import myOrder from './modules/myOrder';
import repeatLoginDialog from './modules/repeatLoginDialog';
import backstep from './modules/backstep';
import allOrder from './modules/allOrders';
import currentPosition from './modules/currentPosition';
import permissions from './modules/permissions';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    bottomSheet,
    backstep,
    bottomNavigation,
    appbar,
    setting,
    loginDialog,
    userDataDialog,
    user,
    myOrder,
    comment,
    repeatLoginDialog,
    errorDialog,
    chat,
    allOrder,
    currentPosition,
    permissions,
  },
});
