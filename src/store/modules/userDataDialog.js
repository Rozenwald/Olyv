const mutations = {
  showUserDataDialog(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showUserDataDialog({ commit }, show) {
    commit('showUserDataDialog', show);
  },
};

const getters = {
  isVisibleUserDataDialog: (state) => state.show,
};

const state = {
  show: true,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
