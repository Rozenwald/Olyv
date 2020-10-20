const mutations = {
  setAllOrder(state, data) {
    state.allOrder = data;
    console.log(state.allOrder);
  },
  setAwaitOrder(state, response) {
    state.awaitOrder = response;
    console.log(state.awaitOrder);
  },
  setProcessOrder(state, response) {
    state.processOrder = response;
    console.log(state.processOrder);
  },
  setKeyOrder(state, response) {
    state.keyOrder = response;
    console.log(state.keyOrder);
  },
};

const actions = {
  setAllOrder({ commit }, data) {
    commit('setAllOrder', data);
  },
  setAwaitOrder({ commit }, awaitOrder) {
    commit('setAwaitOrder', awaitOrder);
  },
  setProcessOrder({ commit }, processOrder) {
    commit('setProcessOrder', processOrder);
  },
  setKeyOrder({ commit }, keyOrder) {
    commit('setKeyOrder', keyOrder);
  },
};

const getters = {
  getAllOrder: (state) => state.allOrder,
  getKeyOrder: (state) => state.keyOrder,
  getAwaitOrder: (state) => state.awaitOrder,
  getProcessOrder: (state) => state.processOrder,
  getShowLoading: (state) => state.showLoading,
};

const state = {
  allOrder: null,
  keyOrder: null,
  awaitOrder: null,
  processOrder: null,
  showLoading: false,
  chipStatus: 'free',
};

export default {
  state,
  getters,
  mutations,
  actions,
};
