const mutations = {
  setComments(state, data) {
    state.comments = data;
  },
  setCommentsId(state, data) {
    state.id = data;
  },
};

const actions = {
  setComments({ commit }, data) {
    commit('setComments', data);
  },
  setCommentsId({ commit }, data) {
    commit('setCommentsId', data);
  },
};

const getters = {
  getComments: (state) => state.comments,
  getCommentsId: (state) => state.id,
};

const state = {
  comments: null,
  id: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
