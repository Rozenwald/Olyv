const mutations = {
  setStatusPhotoDialogVerification(state, status) {
    if ((state.status === true) && (status === true)) {
      state.status = false;
    } else {
      state.status = status;
    }
  },
  setSourceTypePhotoDialogVerification(state, type) {
    state.sourceType = type;
  },
};

const actions = {
  setStatusPhotoDialogVerification({ commit }, status) {
    commit('setStatusPhotoDialogVerification', status);
  },

  setSourceTypePhotoDialogVerification({ commit }, type) {
    commit('setSourceTypePhotoDialogVerification', type);
  },
};

const getters = {
  getStatusPhotoDialogVerification: (state) => state.status,
  getSourceTypePhotoDialogVerification: (state) => state.sourceType,
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
