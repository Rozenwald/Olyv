const mutations = {
  setStatusPhotoDialog(state, status) {
    if ((state.status === true) && (status === true)) {
      state.status = false;
    } else {
      state.status = status;
    }
  },
  setSourceTypePhotoDialo(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatusPhotoDialo({ commit }, status) {
    commit('setStatusPhotoDialo', status);
  },

  setSourceTypePhotoDialo({ commit }, type) {
    commit('setSourceTypePhotoDialo', type);
  },
};

const getters = {
  getStatusPhotoDialo: (state) => state.status,
  getSourceTypePhotoDialo: (state) => state.sourceType,
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
