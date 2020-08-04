import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';
import MoiZakazi from '../views/MoiZakazi.vue';
import SpisokZakazov from '../views/SpisokZakazov.vue';
import Registration from '../views/Registration.vue';
import CustomerMoreInfo from '../views/CustomerMoreInfo.vue';
import Create from '../views/Create.vue';
import Auth from '../views/Authorization.vue';
import ExecutorMoreInfo from '../views/ExecutorMoreInfo.vue';
import BottomShit from '../views/BottomShit.vue';
import Verification from '../views/Verification.vue';
import ExecutorProfile from '../views/ExecutorProfile.vue';
import CustomerProfile from '../views/CustomerProfile.vue';

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
    name: 'profile',
    path: '/profile',
    component: SetUserData,
  },
  {
    name: 'setting',
    path: '/setting',
    component: Setting,
  },
  {
    name: 'customerMoreInfo',
    path: '/customerMoreInfo',
    component: CustomerMoreInfo,
  },
  {
    name: 'create',
    path: '/create',
    component: Create,
  },
  {
    name: 'moreInfoOrder',
    path: '/moreInfoOrder',
    component: CustomerMoreInfo,
  },
  {
    name: 'myOrder',
    path: '/myOrder',
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
