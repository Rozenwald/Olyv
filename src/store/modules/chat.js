const mutations = {
  setIdUserRequest(state, id) {
    state.idUserRequest = id;
  },
  setUserRequest(state, data) {
    state.userRequest = data;
  },
};

const actions = {
  setIdUserRequest({ commit }, id) {
    commit('setIdUserRequest', id);
  },
  setUserRequest({ commit }, data) {
    commit('setUserRequest', data);
  },
};

const getters = {
  getIdUserRequest: (state) => state.idUserRequest,
  getUserRequest: (state) => state.userRequest,
};

const state = {
  idUserRequest: true,
  userRequest: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
