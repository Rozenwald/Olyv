import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';
import MoiZakazi from '../views/MoiZakazi.vue';
import SpisokZakazov from '../views/SpisokZakazov.vue';
import Registration from '../views/Registration.vue';
import CustomerMoreInfo from '../views/CustomerMoreInfo.vue';
import EditOrder from '../views/EditOrder.vue';
import Auth from '../views/Authorization.vue';
import ExecutorMoreInfo from '../views/ExecutorMoreInfo.vue';
import BottomShit from '../components/BottomShit.vue';
import Verification from '../views/Verification.vue';
import ExecutorProfile from '../views/ExecutorProfile.vue';
import CustomerProfile from '../views/CustomerProfile.vue';
import Chat from '../views/Chat.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'bottomshit',
    path: '/bottomshit',
    component: BottomShit,
  },
  {
    name: 'registration',
    path: '/registration',
    component: Registration,
  },
  {
    name: 'auth',
    path: '/auth',
    component: Auth,
  },
  {
    name: 'moiZakazi',
    path: '/moiZakazi',
    component: MoiZakazi,
  },
  {
    name: 'spisokZakazov',
    path: '/spisokZakazov',
    component: SpisokZakazov,
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
  },
  {
    name: 'editOrder',
    path: '/editOrder',
    component: EditOrder,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/* router.beforeEach((to, from, next) => {
  if (to.name === 'executorProfile') next({ name: 'profile' });
  else next();
}); */

export default router;
