const mutations = {
  setMyComments(state, data) {
    state.myComments = data;
    console.log(state.myComments);
  },
};

const actions = {
  setMyComments({ commit }, data) {
    commit('setMyComments', data);
  },
};

const getters = {
  getMyComments: (state) => state.myComments,
};

const state = {
  myComments: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
