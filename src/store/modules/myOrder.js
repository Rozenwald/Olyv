const mutations = {
  setMyOrder(state, order) {
    state.order = order;
  },
  setType(state, type) {
    console.log(type);
    state.type = type;
  },
};

const actions = {
  setMyOrder({ commit }, order) {
    commit('setMyOrder', order);
  },
  setType({ commit }, type) {
    commit('setType', type);
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
