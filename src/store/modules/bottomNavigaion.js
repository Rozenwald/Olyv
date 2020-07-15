const mutations = {
  showBottomNavigation(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showBottomNavigation({ commit }) {
    commit('showBottomNavigation');
  },
};

const getters = {
  getItemsBottomNavigaion: (state) => state.items,
  isVisibleBottomNavigation: (state) => state.show,
};

const state = {
  items: [
    { title: 'Мои заказы', icon: 'MyOrder', routeName: 'moiZakazi' },
    { title: 'Список заказов', icon: 'OrdersList', routeName: 'spisokZakazov' },
    { title: '', icon: 'Plus' },
    { title: 'Профиль', icon: 'User', routeName: 'profile' },
    { title: 'Настройки', icon: 'Setting', routeName: 'setting' },
  ],
  show: true,
};

export default {
  state,
  getters,
  mutations,
  actions,

};
