const mutations = {
  setBottomSheetStatus(state, status) {
    state.status = status;
  },
  setElFocus(state, flag) {
    state.elFocus = flag;
  },
  setBottomSheetShowStatus(state, flag) {
    state.show = flag;
  },
};

const actions = {
  setBottomSheetStatus({ commit }, status) {
    commit('setBottomSheetStatus', status);
  },
  setElFocus({ commit }, flag) {
    commit('setElFocus', flag);
  },
  setBottomSheetShowStatus({ commit }, flag) {
    commit('setBottomSheetShowStatus', flag);
  },
};

const getters = {
  getBottomSheetStatus: (state) => state.status,
  getElFocus: (state) => state.elFocus,
  showBottomSheet: (state) => state.show,
};

const state = {
  status: 'close',
  elFocus: false,
  show: false,
};

export default {
  state,
  getters,
  mutations,
  actions,

};
