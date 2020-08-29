const mutations = {
  setBottomSheetStatus(state, status) {
    state.status = status;
  },
  setElFocus(state, flag) {
    state.elFocus = flag;
  },
};

const actions = {
  setBottomSheetStatus({ commit }, status) {
    commit('setBottomSheetStatus', status);
  },
  setElFocus({ commit }, flag) {
    commit('setElFocus', flag);
  },
};

const getters = {
  getBottomSheetStatus: (state) => state.status,
  getElFocus: (state) => state.elFocus,
};

const state = {
  status: 'close',
  elFocus: false,
};

export default {
  state,
  getters,
  mutations,
  actions,

};
