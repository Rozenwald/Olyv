const mutations = {
  setTransitionName(state, name) {
    state.transitionName = name;
  },
};

const actions = {
  setTransitionName({ commit }, name) {
    commit('setTransitionName', name);
  },
};

const getters = {
  getTransitionName: (state) => state.transitionName,
};

const state = {
  transitionName: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
