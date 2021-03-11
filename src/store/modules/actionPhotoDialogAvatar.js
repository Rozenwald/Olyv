const mutations = {
  setStatus(state, status) {
    state.status = status;
  },
  setSourceType(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatus({ commit }, status) {
    commit('setStatus', status);
  },

  setSourceType({ commit }, type) {
    commit('setSourceType', type);
  },
};

const getters = {
  getStatus: (state) => state.status,
  getSourceType: (state) => state.sourceType,
};

const state = {
  status: false,
  sourceType: null,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
