const mutations = {
  setMyOrder(state, order) {
    state.order = order;
  },
};

const actions = {
  setMyOrder({ commit }, order) {
    commit('setMyOrder', order);
  },
};

const getters = {
  getMyOrder: (state) => state.order,
};

const state = {
  order: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
