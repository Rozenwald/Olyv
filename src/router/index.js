import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';
import MoiZakazi from '../views/MoiZakazi.vue';
import AwaitOrders from '../components/myOrders/AwaitOrders.vue';
import ProcessOrders from '../components/myOrders/ProcessOrders.vue';
import EndedOrders from '../components/myOrders/EndedOrders.vue';
import SpisokZakazov from '../views/SpisokZakazov.vue';
import AllOrder from '../views/SpisokZakazov/AllOrder.vue';
import AwaitOrder from '../views/SpisokZakazov/AwaitOrder.vue';
import ProcessOrder from '../views/SpisokZakazov/ProcessOrder.vue';
import EndedOrder from '../views/SpisokZakazov/EndedOrder.vue';
import KeyOrder from '../views/SpisokZakazov/KeyOrder.vue';
import Auth from '../views/Authorization.vue';
import Registration from '../views/Registration.vue';
import RecoveryPassword from '../views/RecoveryPassword.vue';
import UpdatePassword from '../views/UpdatePassword.vue';
import CustomerMoreInfo from '../views/CustomerMoreInfo.vue';
import ExecutorMoreInfo from '../views/ExecutorMoreInfo.vue';
import Verification from '../views/Verification.vue';
import CustomerProfile from '../views/CustomerProfile.vue';
import SuccessUpdatePassword from '../views/SuccessUpadatePassword.vue';
import ConfirmCabinet from '../views/ConfirmCabinet.vue';
import Chat from '../views/Chat.vue';
import allChat from '../views/AllChat.vue';
import keyWords from '../views/KeyWords.vue';
import store from '../store/index';
import PublicProfile from '../views/PublicProfile.vue';

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
    name: 'updatePassword',
    path: '/updatePassword',
    component: UpdatePassword,
    meta: { index: -1 },
  },
  {
    name: 'recoveryPassword',
    path: '/recoveryPassword',
    component: RecoveryPassword,
    meta: { index: -1 },
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
        meta: { index: 1, subindex: 1 },
      },
      {
        name: 'myProcessOrders',
        path: 'myProcessOrders',
        component: ProcessOrders,
        meta: { index: 1, subindex: 2 },
      },
      {
        name: 'myEndedOrders',
        path: 'myEndedOrders',
        component: EndedOrders,
        meta: { index: 1, subindex: 3 },
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
        meta: { index: 2, subindex: 1 },
      },
      {
        name: 'allOrder',
        path: 'allOrder',
        component: AllOrder,
        meta: { index: 2, subindex: 2 },
      },
      {
        name: 'awaitOrder',
        path: 'awaitOrder',
        component: AwaitOrder,
        meta: { index: 2, subindex: 3 },
      },
      {
        name: 'processOrder',
        path: 'processOrder',
        component: ProcessOrder,
        meta: { index: 2, subindex: 4 },
      },
      {
        name: 'endedOrder',
        path: 'endedOrder',
        component: EndedOrder,
        meta: { index: 2, subindex: 5 },
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
  {
    name: 'confirmCabinet',
    path: '/confirmCabinet',
    component: ConfirmCabinet,
    meta: { index: 0 },
  },
  {
    name: 'successUpdatePassword',
    path: '/successUpdatePassword',
    component: SuccessUpdatePassword,
    meta: { index: 0 },
  },
  {
    name: 'publicProfile',
    path: '/publicProfile',
    component: PublicProfile,
    meta: { index: 7 },
    props: true,
  },
];

const mode = window.cordova.platformId === 'browser' ? 'history' : 'hash';

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode,
});

router.beforeEach((to, from, next) => {
  if (to.meta.index > from.meta.index) {
    store.dispatch('setTransitionName', 'slide-left');
  } else if (!to.meta.subindex || !from.meta.subindex) {
    store.dispatch('setTransitionName', 'slide-right');
  } else if (to.meta.subindex > from.meta.subindex) {
    store.dispatch('setTransitionName', 'slide-left');
  } else {
    store.dispatch('setTransitionName', 'slide-right');
  }

  next();
});

export default router;
