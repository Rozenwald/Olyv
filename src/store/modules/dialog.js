const mutations = {
  setDataDialog(state, data) {
    state.title = data.title;
    state.text = data.text;
    state.button1 = data.button1;
    state.button2 = data.button2;
    state.functionFirst = data.firstBtnFunction;
    state.functionSecond = data.secondBtnFunction;
  },
  setVisibleDialog(state, visible) {
    console.log(state.visible);
    state.visible = visible;
    console.log(state.visible);
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
  getFirstButton: (state) => state.button1,
  getSecondButton: (state) => state.button2,
  getFirstBtnFunction: (state) => state.functionFirst,
  getSecondBtnFunction: (state) => state.functionSecond,
};

const state = {
  visible: false,
  title: '',
  text: '',
  button1: false,
  button2: false,
  functionFirst: null,
  functionSecond: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
