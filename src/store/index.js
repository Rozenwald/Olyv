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
import comments from './modules/comments';
import myOrder from './modules/myOrder';
import allOrder from './modules/allOrders';
import currentPosition from './modules/currentPosition';
import permissions from './modules/permissions';
import dialog from './modules/dialog';
import feedbackDialog from './modules/feedbackDialog';
import feedback from './modules/feedback';
import route from './modules/route';
import map from './modules/map';
import actionPhotoDialog from './modules/actionPhotoDialog';
import actionPhotoDialogAvatar from './modules/actionPhotoDialogAvatar';
import actionFileDialog from './modules/actionFileDialog';
import actionPhotoDialogUserGallery from './modules/actionPhotoDialogUserGallery';
import actionPhotoDialogVerification from './modules/actionPhotoDialogVerification';
import dialogMessages from './modules/dialogMessages';
import myOrders from './modules/myOrders';
import deepLinks from './modules/deepLinks';

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
    comments,
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
    feedbackDialog,
    feedback,
    route,
    map,
    actionPhotoDialog,
    actionFileDialog,
    dialogMessages,
    myOrders,
    deepLinks,
    actionPhotoDialogAvatar,
    actionPhotoDialogUserGallery,
    actionPhotoDialogVerification,
  },
});
