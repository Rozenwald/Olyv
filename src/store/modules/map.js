const mutations = {
  fullscreen(state, fullscreen) {
    state.fullscreen = fullscreen;
  },
};

const actions = {
  fullscreen({ commit }, fullscreen) {
    commit('fullscreen', fullscreen);
  },
};

const getters = {
  fullscreen: (state) => state.fullscreen,
};

const state = {
  fullscreen: false,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
