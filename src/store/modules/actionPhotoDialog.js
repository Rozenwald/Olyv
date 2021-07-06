const mutations = {
  setStatusPhotoDialog(state, status) {
    if ((state.status === true) && (status === true)) {
      state.status = false;
    } else {
      state.status = status;
    }
  },
  setSourceTypePhotoDialog(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatusPhotoDialog({ commit }, status) {
    commit('setStatusPhotoDialog', status);
  },

  setSourceTypePhotoDialog({ commit }, type) {
    commit('setSourceTypePhotoDialog', type);
  },
};

const getters = {
  getStatusPhotoDialog: (state) => state.status,
  getSourceTypePhotoDialog: (state) => state.sourceType,
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
