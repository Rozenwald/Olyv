import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';
import MoiZakazi from '../views/MoiZakazi.vue';
import SpisokZakazov from '../views/SpisokZakazov/SpisokZakazov.vue';
import Registration from '../views/Registration.vue';
import CustomerMoreInfo from '../views/CustomerMoreInfo.vue';
import Auth from '../views/Authorization.vue';
import Create from '../views/Create.vue';
import ExecutorMoreInfo from '../views/ExecutorMoreInfo.vue';
import Verification from '../views/Verification.vue';
import ExecutorProfile from '../views/ExecutorProfile.vue';
import CustomerProfile from '../views/CustomerProfile.vue';
import Chat from '../views/Chat.vue';
import keyWords from '../views/KeyWords.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    path: '/',
    redirect: '/spisokZakazov',
  },
  {
    name: 'keyWords',
    path: '/keyWords',
    component: keyWords,
  },
  {
    name: 'create',
    path: '/create',
    component: Create,
  },
  {
    name: 'registration',
    path: '/registration',
    component: Registration,
    meta: { index: 0 },
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth,
    meta: { index: 0 },
  },
  {
    name: 'moiZakazi',
    path: '/moiZakazi',
    component: MoiZakazi,
    meta: { index: 1 },
  },
  {
    name: 'spisokZakazov',
    path: '/spisokZakazov',
    component: SpisokZakazov,
    meta: { index: 2 },
  },
  {
    name: 'setUserData',
    path: '/setUserData',
    component: SetUserData,
  },
  {
    name: 'setting',
    path: '/setting',
    component: Setting,
    meta: { index: 4 },
  },
  {
    name: 'chat',
    path: '/chat',
    component: Chat,
  },
  {
    name: 'customerMoreInfo',
    path: '/customerMoreInfo',
    component: CustomerMoreInfo,
  },
  {
    name: 'executorMoreInfo',
    path: '/executorMoreInfo',
    component: ExecutorMoreInfo,
  },
  {
    name: 'verification',
    path: '/verification',
    component: Verification,
  },
  {
    name: 'executorProfile',
    path: '/executorProfile',
    component: ExecutorProfile,
  },
  {
    name: 'customerProfile',
    path: '/customerProfile',
    component: CustomerProfile,
    meta: { index: 3 },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.index > from.meta.index) {
    store.dispatch('setTransitionName', 'slide-left');
  } else {
    store.dispatch('setTransitionName', 'slide-right');
  }

  next();
});

export default router;
