const mutations = {
  setDataDialog(state, data) {
    state.title = data.title;
    state.text = data.text;
    state.button1text = data.button1text;
    state.button2text = data.button2text;
    state.functionFirst = data.functionFirst;
    state.functionSecond = data.functionSecond;
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
  getFirstButtonText: (state) => state.button1text,
  getSecondButtonText: (state) => state.button2text,
};

const state = {
  visible: false,
  title: '',
  text: '',
  button1text: '',
  button2text: '',
  functionFirst: null,
  functionSecond: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
