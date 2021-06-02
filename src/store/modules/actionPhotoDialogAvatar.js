const mutations = {
  setStatusPhotoDialogAvatar(state, status) {
    state.status = status;
  },
  setSourceType(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatusPhotoDialogAvatar({ commit }, status) {
    commit('setStatusPhotoDialogAvatar', status);
  },

  setSourceType({ commit }, type) {
    commit('setSourceType', type);
  },
};

const getters = {
  getStatusPhotoDialogAvatar: (state) => state.status,
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
