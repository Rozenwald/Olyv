const mutations = {
  setMyOrder(state, data) {
    state.order = data.order;
    state.type = data.type;
  },
};

const actions = {
  setMyOrder({ commit }, data) {
    commit('setMyOrder', data);
  },
};

const getters = {
  getMyOrder: (state) => state.order,
  getOrderType: (state) => state.type,
};

const state = {
  order: null,
  type: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
