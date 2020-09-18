const mutations = {
  setAddressSheetStatus(state, status) {
    state.statusAddress = status;
  },
  setMainSheetStatus(state, status) {
    state.statusMain = status;
  },
  setDescriptionSheetStatus(state, status) {
    state.statusDescription = status;
  },
  setCostSheetStatus(state, status) {
    state.statusCost = status;
  },
  setAddress(state, address) {
    state.address = address;
  },
  setDescription(state, description) {
    state.description = description;
  },
  setCost(state, cost) {
    state.cost = cost;
  },
};

const actions = {
  setMainSheetStatus({ commit }, status) {
    commit('setMainSheetStatus', status);
    if (status === 'close') {
      commit('showBottomNavigation', true);
    } else {
      commit('showBottomNavigation', false);
    }
  },
  setAddressSheetStatus({ commit }, status) {
    commit('setAddressSheetStatus', status);
  },
  setDescriptionSheetStatus({ commit }, status) {
    commit('setDescriptionSheetStatus', status);
  },
  setCostSheetStatus({ commit }, status) {
    commit('setCostSheetStatus', status);
  },
  setAddress({ commit }, address) {
    commit('setAddress', address);
  },
  setDescription({ commit }, description) {
    commit('setDescription', description);
  },
  setCost({ commit }, cost) {
    commit('setCost', cost);
  },
};

const getters = {
  getMainSheetStatus: (state) => state.statusMain,
  getAddressSheetStatus: (state) => state.statusAddress,
  getDescriptionSheetStatus: (state) => state.statusDescription,
  getCostSheetStatus: (state) => state.statusCost,
  getAddress: (state) => state.address,
  getDescription: (state) => state.description,
  getCost: (state) => state.cost,
};

const state = {
  statusMain: 'close',
  statusAddress: 'close',
  statusCost: 'close',
  statusDescription: 'close',
  address: null,
  description: null,
  cost: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
