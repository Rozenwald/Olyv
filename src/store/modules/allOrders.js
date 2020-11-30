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
  setChipStatus(state, response) {
    state.chipStatus = response;
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
  setChipStatus({ commit }, chipStatus) {
    commit('setChipStatus', chipStatus);
  },
};

const getters = {
  getAllOrder: (state) => state.allOrder,
  getKeyOrder: (state) => state.keyOrder,
  getAwaitOrder: (state) => state.awaitOrder,
  getProcessOrder: (state) => state.processOrder,
  getShowLoading: (state) => state.showLoading,
  getChipStatus: (state) => state.chipStatus,
};

const state = {
  allOrder: null,
  keyOrder: null,
  awaitOrder: null,
  processOrder: null,
  showLoading: false,
  chipStatus: 'all',
};

export default {
  state,
  getters,
  mutations,
  actions,
};
