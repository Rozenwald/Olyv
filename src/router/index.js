import Vue from 'vue';
import VueRouter from 'vue-router';
import SetUserData from '../views/SetUserData.vue';
import Setting from '../views/Setting.vue';

Vue.use(VueRouter);

const routes = [
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
