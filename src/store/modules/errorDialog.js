const mutations = {
  setError(state, error) {
    state.error = error;
  },
};

const actions = {
  setError({ commit }, error) {
    commit('setError', error);
  },
};

const getters = {
  getError: (state) => state.error,
};

const state = {
  error: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
