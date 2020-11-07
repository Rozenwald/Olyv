const mutations = {
  setDataDialog(state, data) {
    state.title = data.title;
    state.text = data.text;
    state.button1text = data.button1text;
    state.button2text = data.button2text;
    state.firstBtnFunction = data.firstBtnFunction;
    state.secondBtnFunction = data.secondBtnFunction;
  },
  setVisibleDialog(state, visible) {
    state.visible = visible;
  },
};

const actions = {
  setDataDialog({ commit }, data) {
    commit('setDataDialog', data);
  },
  setVisibleDialog({ commit }, visible) {
    commit('setVisibleDialog', visible);
  },
};

const getters = {
  getVisibleDialog: (state) => state.visible,
  getDialogTitle: (state) => state.title,
  getDialogText: (state) => state.text,
  getFirstButtonText: (state) => state.button1text,
  getSecondButtonText: (state) => state.button2text,
  getFirstBtnFunction: (state) => state.firstBtnFunction,
  getSecondBtnFunction: (state) => state.secondBtnFunction,
};

const state = {
  visible: false,
  title: '',
  text: '',
  button1text: '',
  button2text: '',
  firstBtnFunction: null,
  secondBtnFunction: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
