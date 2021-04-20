const mutations = {
  setComments(state, data) {
    state.comments = data;
  },
};

const actions = {
  setComments({ commit }, data) {
    commit('setComments', data);
  },
};

const getters = {
  getComments: (state) => state.comments,
};

const state = {
  comments: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
