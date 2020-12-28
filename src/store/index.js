import Vue from 'vue';
import Vuex from 'vuex';
import bottomSheet from './modules/bottomSheet';
import bottomNavigation from './modules/bottomNavigation';
import appbar from './modules/appbar';
import setting from './modules/setting';
import comment from './modules/comment';
import userDataDialog from './modules/userDataDialog';
import user from './modules/user';
import chat from './modules/chat';
import myOrder from './modules/myOrder';
import allOrder from './modules/allOrders';
import currentPosition from './modules/currentPosition';
import permissions from './modules/permissions';
import dialog from './modules/dialog';
import route from './modules/route';
import map from './modules/map';
import actionPhotoDialog from './modules/actionPhotoDialog';
import actionFileDialog from './modules/actionFileDialog';
import dialogMessages from './modules/dialogMessages';
import myOrders from './modules/myOrders';

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
    bottomNavigation,
    appbar,
    setting,
    userDataDialog,
    user,
    myOrder,
    comment,
    chat,
    allOrder,
    currentPosition,
    permissions,
    dialog,
    route,
    map,
    actionPhotoDialog,
    actionFileDialog,
    dialogMessages,
    myOrders,
  },
});
