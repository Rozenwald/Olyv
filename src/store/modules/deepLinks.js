const mutations = {
  setRecoveryPasswordToken(state, token) {
    state.recoveryPasswordToken = token;
  },

  setConfirmEmailToken(state, token) {
    state.confirmEmailToken = token;
  },
};

const actions = {
  setRecoveryPasswordToken({ commit }, token) {
    commit('setRecoveryPasswordToken', token);
  },

  setConfirmEmailToken({ commit }, token) {
    commit('setConfirmEmailToken', token);
  },
};

const getters = {
  getRecoveryPasswordToken: (state) => state.recoveryPasswordToken,
  getConfirmEmailToken: (state) => state.confirmEmailToken,
};

const state = {
  recoveryPasswordToken: null,
  confirmEmailToken: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
