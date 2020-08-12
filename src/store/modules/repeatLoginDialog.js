const mutations = {
  showRepeatLoginDialog(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showRepeatLoginDialog({ commit }, show) {
    commit('showRepeatLoginDialog', show);
  },
};

const getters = {
  isVisibleRepeatLoginDialog: (state) => state.show,
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
