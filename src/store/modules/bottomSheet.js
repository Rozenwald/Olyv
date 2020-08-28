const mutations = {
  setBottomSheetStatus(state, status) {
    state.status = status;
  },
};

const actions = {
  setBottomSheetStatus({ commit }, status) {
    commit('setBottomSheetStatus', status);
  },
};

const getters = {
  getBottomSheetStatus: (state) => state.status,
};

const state = {
  status: 'close',
};

export default {
  state,
  getters,
  mutations,
  actions,

};
