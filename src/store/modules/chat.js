const mutations = {
  setIdUserRequest(state, id) {
    state.idUserRequest = id;
  },
};

const actions = {
  setIdUserRequest({ commit }, id) {
    commit('setIdUserRequest', id);
  },
};

const getters = {
  getIdUserRequest: (state) => state.idUserRequest,
};

const state = {
  idUserRequest: true,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
