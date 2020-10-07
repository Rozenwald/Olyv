const mutations = {
  showChatDialog(state, flag) {
    console.log(state.show);
    state.show = flag;
  },
  textForChatDialog(state, flag) {
    console.log(state.text);
    state.text = flag;
  },
};

const actions = {
  showChatDialog({ commit }, show) {
    console.log(show);
    commit('showChatDialog', show);
    console.log(show);
  },
  textForChatDialog({ commit }, text) {
    commit('textForChatDialog', text);
  },
};

const getters = {
  isVisibleChatDialog: (state) => state.show,
  getTextMessage: (state) => state.text,
};

const state = {
  show: false,
  text: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
