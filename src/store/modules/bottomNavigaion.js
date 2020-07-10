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
    { title: 'Мои заказы', icon: '$vuetify.icons.my_orders', routeName: 'MoiZakazi' },
    { title: 'Список заказов', icon: '$vuetify.icons.orders_list', routeName: 'Registration' },
    { title: '', icon: '$vuetify.icons.plus' },
    { title: 'Профиль', icon: '$vuetify.icons.user', routeName: 'profile' },
    { title: 'Настройки', icon: '$vuetify.icons.setting', routeName: 'setting' },
  ],
  show: true,
};

export default {
  state,
  getters,
  mutations,
  actions,

};
