const mutations = {
  setStatusFileDialog(state, status) {
    if ((state.status === true) && (status === true)) {
      state.status = false;
    } else {
      state.status = status;
    }
  },
  setSourceTypeFileDialog(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatusFileDialog({ commit }, status) {
    commit('setStatusFileDialog', status);
  },

  setSourceTypeFileDialog({ commit }, type) {
    commit('setSourceTypeFileDialog', type);
  },
};

const getters = {
  getStatusFileDialog: (state) => state.status,
  getSourceTypeFileDialog: (state) => state.sourceType,
};

const state = {
  status: false,
  sourceType: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
