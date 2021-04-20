const mutations = {
  setMyOrders(state, data) {
    state.myOrders = data;
  },
  setMyProcessOrders(state, data) {
    state.myProcessOrders = data;
  },
  setMyEndedOrders(state, data) {
    state.myEndedOrders = data;
  },
};

const actions = {
  setMyOrders({ commit }, data) {
    commit('setMyOrders', data);
  },
  setMyProcessOrders({ commit }, data) {
    commit('setMyProcessOrders', data);
  },
  setMyEndedOrders({ commit }, data) {
    commit('setMyEndedOrders', data);
  },
};

const getters = {
  getMyOrders: (state) => state.myOrders,
  getMyProcessOrders: (state) => state.myProcessOrders,
  getMyEndedOrders: (state) => state.myEndedOrders,
};

const state = {
  myOrders: null,
  myProcessOrders: null,
  myEndedOrders: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
