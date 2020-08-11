const mutations = {
  setMyOrder(state, id) {
    state.id = id;
  },
};

const actions = {
  setMyOrder({ commit }, id) {
    commit('setMyOrder', id);
  },
};

const getters = {
  getMyOrder: (state) => state.id,
};

const state = {
  id: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
