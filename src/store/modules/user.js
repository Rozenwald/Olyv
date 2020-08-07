const mutations = {
  setToken(state, token) {
    state.token = token;
    if (token !== null) {
      state.isAuth = true;
    } else {
      state.isAuth = false;
    }
  },
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  setUser({ commit }, user) {
    commit('setUser', user);
  },
};

const getters = {
  getToken: (state) => state.token,
  isAuth: (state) => state.isAuth,
  getUser: (state) => state.user,
};

const state = {
  token: null,
  isAuth: null,
  user: {},
};

export default {
  state,
  getters,
  mutations,
  actions,
};
