const mutations = {
  showBottomShit(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showBottomShit({ commit }, show) {
    commit('showBottomShit', show);
  },
};

const getters = {
  statusShit: (state) => state.show,
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
