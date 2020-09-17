const mutations = {
  showBubble(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showBubble({ commit }, show) {
    commit('showBubble', show);
  },
};

const getters = {
  visibleBubble: (state) => state.show,
};

const state = {
  show: false,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
