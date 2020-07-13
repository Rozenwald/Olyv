const mutations = {
  showBottomnavigation(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showBottomnavigation({ commit }) {
    commit('showBottomnavigation');
  },
};

const getters = {
  getItems: (state) => state.items,
  isVisibleBottomnavigation: (state) => state.show,
};

const state = {
  items: [
    { title: 'Мои заказы', icon: 'MyOrder', routeName: 'MoiZakazi' },
    { title: 'Список заказов', icon: 'OrdersList', routeName: 'SpisokZakazov' },
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
