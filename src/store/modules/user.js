const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  },
};

const getters = {
  getToken: (state) => state.token,
};

const state = {
  token: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
