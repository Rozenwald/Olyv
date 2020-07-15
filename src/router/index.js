import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';
import MoiZakazi from '../views/MoiZakazi.vue';
import SpisokZakazov from '../views/SpisokZakazov.vue';
import Registration from '../views/Registration.vue';
import CustomerMoreInfo from '../views/CustomerMoreInfo.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'registration',
    path: '/registration',
    component: Registration,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
