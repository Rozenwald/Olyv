const mutations = {
  setMyOrder(state, data) {
    state.order = data.order;
  },
  setType(state, data) {
    state.type = data.type;
  },
};

const actions = {
  setMyOrder({ commit }, data) {
    commit('setMyOrder', data);
  },
  setType({ commit }, data) {
    commit('setType', data);
  },
};

const getters = {
  getMyOrder: (state) => state.order,
  getOrderType: (state) => state.type,
};

const state = {
  order: null,
  type: 'free',
};

export default {
  state,
  getters,
  mutations,
  actions,
};
