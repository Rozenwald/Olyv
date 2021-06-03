const mutations = {
  setStatusPhotoDialogAvatar(state, status) {
    if ((state.status === true) && (status === true)) {
      state.status = false;
    } else {
      state.status = status;
    }
  },
  setSourceTypePhotoDialogAvatar(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatusPhotoDialogAvatar({ commit }, status) {
    commit('setStatusPhotoDialogAvatar', status);
  },

  setSourceTypePhotoDialogAvatar({ commit }, type) {
    commit('setSourceTypePhotoDialogAvatar', type);
  },
};

const getters = {
  getStatusPhotoDialogAvatar: (state) => state.status,
  getSourceTypePhotoDialogAvatar: (state) => state.sourceType,
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
