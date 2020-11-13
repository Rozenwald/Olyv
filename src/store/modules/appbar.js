const mutations = {
  setTitle(state, title) {
    state.current_title = title;
  },
  showAppbar(state, flag) {
    state.showAppbar = flag;
  },
  showBackBtn(state, flag) {
    state.showBackBtn = flag;
  },
};

const actions = {
  showAppbar({ commit }, showAppbar) {
    commit('showAppbar', showAppbar);
  },
  showBackBtn({ commit }, showBackBtn) {
    commit('showBackBtn', showBackBtn);
  },
};

const getters = {
  getTitle: (state) => state.current_title,
  isVisibleAppbar: (state) => state.showAppbar,
  isVisibleBackBtn: (state) => state.showBackBtn,
};

const state = {
  current_title: null,
  showAppbar: true,
  showBackBtn: true,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
