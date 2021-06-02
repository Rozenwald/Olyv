const mutations = {
  setStatusPhotoDialogUserGallery(state, status) {
    if ((state.status === true) && (status === true)) {
      state.status = false;
    } else {
      state.status = status;
    }
  },
  setSourceTypePhotoDialogUserGallery(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatusPhotoDialogUserGallery({ commit }, status) {
    commit('setStatusPhotoDialogUserGallery', status);
  },

  setSourceTypePhotoDialogUserGallery({ commit }, type) {
    commit('setSourceTypePhotoDialogUserGallery', type);
  },
};

const getters = {
  getStatusPhotoDialogUserGallery: (state) => state.status,
  getSourceTypePhotoDialogUserGallery: (state) => state.sourceType,
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
