const mutations = {
  showLoginDialog(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showLoginDialog({ commit }, show) {
    commit('showLoginDialog', show);
  },
};

const getters = {
  isVisibleLoginDialog: (state) => state.show,
};

const state = {
  show: false,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
