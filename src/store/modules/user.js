const mutations = {
  setToken(state, token) {
    state.token = token;
    if (token !== null) {
      state.isAuth = true;
    } else {
      state.isAuth = false;
    }
  },
};

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  },
};

const getters = {
  getToken: (state) => state.token,
  isAuth: (state) => state.isAuth,
};

const state = {
  token: null,
  isAuth: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
