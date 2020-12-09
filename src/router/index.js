import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';
import MoiZakazi from '../views/MoiZakazi.vue';
import AwaitOrders from '../components/myOrders/AwaitOrders.vue';
import ProcessOrders from '../components/myOrders/ProcessOrders.vue';
import SpisokZakazov from '../views/SpisokZakazov.vue';
import AllOrder from '../views/SpisokZakazov/AllOrder.vue';
import AwaitOrder from '../views/SpisokZakazov/AwaitOrder.vue';
import ProcessOrder from '../views/SpisokZakazov/ProcessOrder.vue';
import KeyOrder from '../views/SpisokZakazov/KeyOrder.vue';
import Registration from '../views/Registration.vue';
import CustomerMoreInfo from '../views/CustomerMoreInfo.vue';
import Auth from '../views/Authorization.vue';
import ExecutorMoreInfo from '../views/ExecutorMoreInfo.vue';
import Verification from '../views/Verification.vue';
import CustomerProfile from '../views/CustomerProfile.vue';
import Chat from '../views/Chat.vue';
import allChat from '../views/AllChat.vue';
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
    meta: { index: 5 },
  },
  {
    name: 'registration',
    path: '/registration',
    component: Registration,
    meta: { index: -1 },
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
    children: [
      {
        name: 'myAwaitOrders',
        path: 'myAwaitOrders',
        component: AwaitOrders,
      },
      {
        name: 'myProcessOrders',
        path: 'myProcessOrders',
        component: ProcessOrders,
      },
      {
        path: '',
        redirect: 'myAwaitOrders',
      },
    ],
  },
  {
    name: 'spisokZakazov',
    path: '/spisokZakazov',
    component: SpisokZakazov,
    meta: { index: 2 },
    children: [
      {
        name: 'keyOrder',
        path: 'keyOrder',
        component: KeyOrder,
        meta: { index: 0 },
      },
      {
        name: 'allOrder',
        path: 'allOrder',
        component: AllOrder,
        meta: { index: 1 },
      },
      {
        name: 'awaitOrder',
        path: 'awaitOrder',
        component: AwaitOrder,
        meta: { index: 2 },
      },
      {
        name: 'processOrder',
        path: 'processOrder',
        component: ProcessOrder,
        meta: { index: 3 },
      },
      {
        path: '',
        redirect: 'allOrder',
      },
    ],
  },
  {
    name: 'setUserData',
    path: '/setUserData',
    component: SetUserData,
    meta: { index: 5 },
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
    meta: { index: 6 },
  },
  {
    name: 'allChat',
    path: '/allChat',
    component: allChat,
  },
  {
    name: 'customerMoreInfo',
    path: '/customerMoreInfo',
    component: CustomerMoreInfo,
    meta: { index: 5 },
  },
  {
    name: 'executorMoreInfo',
    path: '/executorMoreInfo',
    component: ExecutorMoreInfo,
    meta: { index: 5 },
  },
  {
    name: 'verification',
    path: '/verification',
    component: Verification,
    meta: { index: 5 },
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
