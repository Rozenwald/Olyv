const mutations = {
  setVisible(state, data) {
    state.visible = data;
  },
  setText(state, data) {
    state.text = data;
  },
  setSnackbarTimeout(state, data) {
    state.timeout = data;
  },
};

const actions = {
  setSnackbarVisible({ commit }, visible) {
    commit('setVisible', visible);
  },
  setSnackbarText({ commit }, text) {
    commit('setText', text);
  },
  setSnackbarTimeout({ commit }, text) {
    commit('setText', text);
  },
};

const getters = {
  getSnackbarVisible: (state) => state.visible,
  getSnackbarText: (state) => state.text,
  getSnackbarTimeout: (state) => state.timeout,
};

const state = {
  visible: null,
  text: null,
  timeout: 3000,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
