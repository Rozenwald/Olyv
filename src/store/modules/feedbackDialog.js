const mutations = {
  setFeedbackDataDialog(state, data) {
    state.title = data.title;
    state.text = data.text;
    state.button1 = data.button1;
    state.button2 = data.button2;
    state.functionFirst = data.firstBtnFunction;
    state.functionSecond = data.secondBtnFunction;
  },
  setFeedbackVisibleDialog(state, visible) {
    state.visible = visible;
  },
};

const actions = {
  setFeedbackDataDialog({ commit }, data) {
    commit('setFeedbackDataDialog', data);
  },
  setFeedbackVisibleDialog({ commit }, visible) {
    commit('setFeedbackVisibleDialog', visible);
  },
};

const getters = {
  getFeedbackVisibleDialog: (state) => state.visible,
  getFeedbackDialogTitle: (state) => state.title,
  getFeedbackDialogText: (state) => state.text,
  getFeedbackFirstButton: (state) => state.button1,
  getFeedbackSecondButton: (state) => state.button2,
  getFeedbackFirstBtnFunction: (state) => state.functionFirst,
  getFeedbackSecondBtnFunction: (state) => state.functionSecond,
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
