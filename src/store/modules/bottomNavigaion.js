const mutations = {
  showBottomNavigation(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showBottomNavigation({ commit }, show) {
    commit('showBottomNavigation', show);
  },
};

const getters = {
  getItemsBottomNavigaion: (state) => state.items,
  isVisibleBottomNavigation: (state) => state.show,
};

const state = {
  items: [
    { title: 'Заказчик', icon: 'MyOrder', routeName: 'moiZakazi' },
    { title: 'Исполнитель', icon: 'OrdersList', routeName: 'spisokZakazov' },
    { title: '', icon: 'Plus' },
    { title: 'Профиль', icon: 'User', routeName: 'customerProfile' },
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
