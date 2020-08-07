const mutations = {
  comment(state, comment) {
    state.comment = comment;
  },
};

const actions = {
  comment({ commit }, comment) {
    commit('showAppbar', comment);
  },
};

const getters = {
  getComment: (state) => state.comment,
};

const state = {
  comment: null,
};

export default {
  state,
  mutations,
  getters,
  actions,
};
