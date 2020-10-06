const mutations = {
  showChatDialog(state, flag) {
    console.log(state.show);
    state.show = flag;
  },
};

const actions = {
  showChatDialog({ commit }, show) {
    console.log(show);
    commit('showChatDialog', show);
    console.log(show);
  },
};

const getters = {
  isVisibleChatDialog: (state) => state.show,
};

const state = {
  show: false,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
