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
  setAddressData(state, addressData) {
    state.addressData = addressData;
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
  setAddressData({ commit }, addressData) {
    commit('setAddressData', addressData);
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
  getAddressData: (state) => state.addressData,
  getDescription: (state) => state.description,
  getCost: (state) => state.cost,
};

const state = {
  statusMain: false,
  statusAddress: false,
  statusCost: false,
  statusDescription: false,
  addressData: {},
  description: null,
  cost: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
