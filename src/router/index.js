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
<<<<<<< HEAD
=======
import BottomShit from '../views/BottomShit.vue';
>>>>>>> 18e6fa27fcd00011c6c3b691f8c1d3d37b814205
import Verification from '../views/Verification.vue';

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
<<<<<<< HEAD
    path: '/verification',
=======
    path: '/Verification',
>>>>>>> 18e6fa27fcd00011c6c3b691f8c1d3d37b814205
    component: Verification,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
