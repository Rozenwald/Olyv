const mutations = {
  setRecoveryPasswordToken(state, token) {
    state.recoveryPasswordToken = token;
  },
};

const actions = {
  setRecoveryPasswordToken({ commit }, token) {
    commit('setRecoveryPasswordToken', token);
  },
};

const getters = {
  getRecoveryPasswordToken: (state) => state.recoveryPasswordToken,
};

const state = {
  recoveryPasswordToken: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
