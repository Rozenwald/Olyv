const mutations = {
  setComment(state, comment) {
    state.comment = comment;
  },
};

const actions = {
  setComment({ commit }, comment) {
    commit('setComment', comment);
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
