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
  setAll(state, data) {
    state.cost = data.cost;
    state.addressData.value = '';
    state.description = data.description;
    // eslint-disable-next-line no-underscore-dangle
    state.orderId = data._id;
  },
  isEdit(state, isEdit) {
    state.isEdit = isEdit;
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
  setAll({ commit }, data) {
    commit('setAll', data);
  },
  isEdit({ commit }, isEdit) {
    commit('isEdit', isEdit);
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
  getOrderId: (state) => state.orderId,
  isEdit: (state) => state.isEdit,
};

const state = {
  statusMain: false,
  statusAddress: false,
  statusCost: false,
  statusDescription: false,
  addressData: {},
  description: null,
  cost: null,
  isEdit: false,
  orderId: null,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
