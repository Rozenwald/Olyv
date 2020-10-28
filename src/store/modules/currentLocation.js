const mutations = {
  setCurrentPosition(state, position) {
    state.currentPosition = { ...state.currentLocation, ...position };
  },
};

const actions = {
  setCurrentPosition({ commit }, position) {
    commit('setCurrentPosition', position);
  },
};

const getters = {
  getCurrentPosition: (state) => state.currentPosition,
};

const state = {
  currentPosition: {},
};

export default {
  state,
  getters,
  mutations,
  actions,
};
