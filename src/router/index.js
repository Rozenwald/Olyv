import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';
import MoiZakazi from '../views/MoiZakazi.vue';
import SpisokZakazov from '../views/SpisokZakazov.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'MoiZakazi',
    path: '/MoiZakazi',
    component: MoiZakazi,
  },
  {
    name: 'SpisokZakazov',
    path: '/SpisokZakazov',
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
