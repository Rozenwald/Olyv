const mutations = {
  setBottomShitStatus(state, status) {
    state.status = status;
  },
};

const actions = {
  setBottomShitStatus({ commit }, status) {
    commit('setBottomShitStatus', status);
  },
};

const getters = {
  statusBottomShit: (state) => state.status,
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
