const mutations = {
  setMyOrders(state, data) {
    state.myOrders = data;
  },
  setMyProcessOrders(state, data) {
    state.myProcessOrders = data;
  },
};

const actions = {
  setMyOrders({ commit }, data) {
    commit('setMyOrders', data);
  },
  setMyProcessOrders({ commit }, data) {
    commit('setMyProcessOrders', data);
  },
};

const getters = {
  getMyOrders: (state) => state.myOrders,
  getMyProcessOrders: (state) => state.myProcessOrders,
};

const state = {
  myOrders: null,
  myProcessOrders: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
