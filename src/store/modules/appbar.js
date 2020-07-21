const mutations = {
  setTitle(state, title) {
    state.current_title = title;
  },
  showAppbar(state, flag) {
    state.show = flag;
  },
};

const actions = {
  showAppbar({ commit }, show) {
    commit('showAppbar', show);
  },
};

const getters = {
  getTitle: (state) => state.current_title,
  isVisibleAppbar: (state) => state.show,
};

const state = {
  current_title: null,
  show: true,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
