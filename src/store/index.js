import Vue from 'vue';
import Vuex from 'vuex';
import bottomNavigation from './modules/bottomNavigaion';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current_title: null,
  },
  mutations: {
    setTitle(state, title) {
      state.current_title = title;
    },
  },
  actions: {
  },
  modules: {
    bottomNavigation,
  },
});
